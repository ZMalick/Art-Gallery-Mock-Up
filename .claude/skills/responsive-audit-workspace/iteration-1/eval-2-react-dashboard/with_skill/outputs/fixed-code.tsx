import React from "react";

const Dashboard = () => {
  return (
    <>
      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 250px 1fr 300px;
          min-height: 100dvh;
        }

        .dashboard-nav {
          padding: 1.25rem;
          background: #1a1a2e;
        }

        .dashboard-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .dashboard-nav li {
          padding: 0;
        }

        .dashboard-nav a {
          display: block;
          padding: 0.75rem 1rem;
          min-height: 44px;
          font-size: 1rem;
          color: #ccc;
          text-decoration: none;
        }

        .dashboard-nav a:hover {
          color: #fff;
        }

        .dashboard-main {
          padding: 2.5rem;
          overflow: auto;
        }

        .card-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
        }

        .card {
          flex: 1 1 200px;
          min-width: 150px;
          height: 150px;
          background: #f0f0f0;
          border-radius: 8px;
        }

        .table-wrapper {
          overflow-x: auto;
          margin-top: 1.25rem;
          -webkit-overflow-scrolling: touch;
        }

        .table-wrapper table {
          width: 100%;
          min-width: 500px;
          border-collapse: collapse;
        }

        .table-wrapper th,
        .table-wrapper td {
          padding: 0.75rem;
          text-align: left;
        }

        .dashboard-aside {
          padding: 1.25rem;
          background: #f5f5f5;
        }

        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 250px 1fr;
          }

          .dashboard-aside {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-nav {
            position: relative;
          }

          .dashboard-nav ul {
            display: flex;
            flex-wrap: wrap;
            gap: 0.25rem;
          }

          .dashboard-main {
            padding: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .card {
            flex: 1 1 100%;
          }

          .dashboard-main {
            padding: 1rem;
          }
        }
      `}</style>
      <div className="dashboard-grid">
        <nav className="dashboard-nav">
          <ul>
            {["Dashboard", "Analytics", "Users", "Settings"].map((item) => (
              <li key={item}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </nav>
        <main className="dashboard-main">
          <div className="card-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card" />
            ))}
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
            </table>
          </div>
        </main>
        <aside className="dashboard-aside">Activity Feed</aside>
      </div>
    </>
  );
};

export default Dashboard;
