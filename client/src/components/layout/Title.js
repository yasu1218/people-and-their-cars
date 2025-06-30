import { Divider } from 'antd';

// ============================================================================
// Title Component
// This component renders the title of the application.
const Title = () => {

  const title = 'People and Their Cars'; // Title text

  // ----------------------------------------------------------------
  // Render the app title area
  const styles = getStyles();
  return (
    <div style={styles.titleContainer}>
      <h1 style={styles.title}>
        { title.toUpperCase() }
      </h1>
      <Divider style={styles.divider}/>
    </div>
  );
}


// ============================================================================
// Styles
const getStyles = () => ({
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 30,
    padding: '5px',
    marginBottom: '5px',
  },
  divider: {
    borderColor: '#888',
  }
}); 

export default Title;