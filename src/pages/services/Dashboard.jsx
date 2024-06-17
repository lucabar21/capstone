import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="dashboard-container">
      <h3>Pet's Super Hero Dashboard</h3>
      <div className="profile-details">
        <p>
          Utente: {user.name} {user.surname} - Email: {user.email}
        </p>
      </div>
    </div>
  );
};
export default Dashboard;
