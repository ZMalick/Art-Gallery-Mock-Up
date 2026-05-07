import React, { useState, useEffect, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useVirtualizer } from '@tanstack/react-virtual';

// Lazy-load chart component to keep it out of the initial bundle
const ChartCanvas = dynamic(() => import('../components/ChartCanvas'), {
  ssr: false,
  loading: () => <div style={{ height: 400 }}>Loading chart...</div>,
});

interface User {
  id: string;
  name: string;
  email: string;
}

function VirtualizedTable({ users }: { users: User[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 20,
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ height: rowVirtualizer.getTotalSize() }}>
            <td colSpan={2} style={{ padding: 0, position: 'relative' }}>
              {rowVirtualizer.getVirtualItems().map(virtualRow => {
                const user = users[virtualRow.index];
                return (
                  <div
                    key={user.id}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                      display: 'flex',
                    }}
                  >
                    <span style={{ flex: 1 }}>{user.name}</span>
                    <span style={{ flex: 1 }}>{user.email}</span>
                  </div>
                );
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [revenue, setRevenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Parallelize all API requests instead of waterfall
    Promise.all([
      fetch('/api/analytics').then(res => res.json()),
      fetch('/api/users').then(res => res.json()),
      fetch('/api/revenue').then(res => res.json()),
    ])
      .then(([analyticsData, usersData, revenueData]) => {
        setData(analyticsData);
        setUsers(usersData);
        setRevenue(revenueData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <div style={{ height: 300, background: '#f0f0f0' }} />
        <div style={{ height: 200, background: '#f5f5f5', marginTop: 16 }} />
        <div style={{ height: 400, background: '#f0f0f0', marginTop: 16 }} />
      </div>
    );
  }

  return (
    <div>
      {/* Use next/image for automatic optimization, lazy loading, and WebP/AVIF */}
      <Image
        src="/banner.png"
        alt="Dashboard banner"
        width={1200}
        height={300}
        priority
        style={{ width: '100%', height: 'auto' }}
      />
      <Image
        src="/team-photo.jpg"
        alt="Team photo"
        width={800}
        height={400}
        loading="lazy"
        style={{ width: '100%', height: 'auto' }}
      />

      {/* Chart is dynamically imported -- not in initial bundle */}
      {data && <ChartCanvas data={data} />}

      {/* Virtualized table for 500+ rows */}
      {users && <VirtualizedTable users={users} />}
    </div>
  );
}
