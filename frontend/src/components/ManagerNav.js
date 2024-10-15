import React from 'react';

const ManagerNav = () => {
  return (
    <div style={styles.container}>
  <a href="/AllB" style={styles.button}>All Bookings</a>
  <a href="/pro" style={styles.button}>Promotions</a>
</div>

  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
  },
  button: {
    width: '80%',
    padding: '20px',
    fontSize: '24px',
    margin: '20px',
    cursor: 'pointer',
    backgroundColor: 'royalblue', // Set the background color to Royal Blue
    color: 'white', // Set the text color to white for better contrast
    border: 'none', // Remove the default border
    borderRadius: '5px',
    textAlign: 'center', // Center the text
    textDecoration: 'none',
  },
};

export default ManagerNav;
