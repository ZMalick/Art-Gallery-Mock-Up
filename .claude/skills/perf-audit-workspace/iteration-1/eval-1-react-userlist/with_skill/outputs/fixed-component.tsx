import React, { useMemo, useCallback, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FixedSizeList as List } from 'react-window';

dayjs.extend(relativeTime);

interface User {
  id: string;
  name: string;
  avatar: string;
  lastActive: string;
}

interface UserRowProps {
  user: User;
  onSelectUser: (user: User) => void;
}

const rowStyle: React.CSSProperties = {
  padding: '12px',
  borderBottom: '1px solid #eee',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

const avatarStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
};

const UserRow = React.memo(({ user, onSelectUser }: UserRowProps) => {
  const handleClick = useCallback(() => {
    onSelectUser(user);
  }, [user, onSelectUser]);

  return (
    <div onClick={handleClick} style={rowStyle}>
      <img
        src={user.avatar}
        width={40}
        height={40}
        loading="lazy"
        style={avatarStyle}
        alt={user.name}
      />
      <span>{user.name}</span>
      <span>{dayjs(user.lastActive).fromNow()}</span>
    </div>
  );
});

UserRow.displayName = 'UserRow';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

const ITEM_HEIGHT = 65;
const LIST_HEIGHT = 600;

interface UserListProps {
  users: User[];
  searchTerm: string;
  onSelectUser: (user: User) => void;
}

const UserList = ({ users, searchTerm, onSelectUser }: UserListProps) => {
  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  const sortedAndFiltered = useMemo(() => {
    const lowerSearch = debouncedSearchTerm.toLowerCase();
    return users
      .filter(u => u.name.toLowerCase().includes(lowerSearch))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [users, debouncedSearchTerm]);

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const user = sortedAndFiltered[index];
      return (
        <div style={style}>
          <UserRow user={user} onSelectUser={onSelectUser} />
        </div>
      );
    },
    [sortedAndFiltered, onSelectUser]
  );

  return (
    <List
      height={LIST_HEIGHT}
      itemCount={sortedAndFiltered.length}
      itemSize={ITEM_HEIGHT}
      width="100%"
    >
      {Row}
    </List>
  );
};

export default React.memo(UserList);
