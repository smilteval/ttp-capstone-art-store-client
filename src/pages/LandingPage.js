
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import background from "../assets/back3.jpeg";
import Header from '../components/Landing/Header';
import StartSelling from '../components/Landing/StartSelling'

//console.log(`url(${  process.env.PUBLIC_URL + '/back3.jpg'})`)
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`, 
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));
export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        
      <CssBaseline />
      <Header />
      <StartSelling/>
      
</div>
  );

}
