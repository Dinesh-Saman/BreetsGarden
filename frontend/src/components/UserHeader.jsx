import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ExitIcon from '@mui/icons-material/ExitToApp';
import { Link, useNavigate } from 'react-router-dom';

const UserHeader = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    }

    // CSS styles as JavaScript objects
    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0288d1',
        padding: '10px 20px',
        color: 'white',
        height: '60px',
    };

    const titleStyle = {
        fontSize: '1.5em',
        fontWeight: 'bold',
        color: 'white',
    };

    const userSectionStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const userNameStyle = {
        marginRight: '10px',
        color: 'white',
    };

    return (
        <Box style={headerStyle}>
            <Box style={titleStyle}>
                <Typography variant="h6">
                    My Dashboard
                </Typography>
            </Box>
            <Box style={userSectionStyle}>
                <Link to={"/user"} style={{ textDecoration: "none", color: "white" }}>
                    <Typography variant="body1" style={userNameStyle}>
                        Mark attendance |
                    </Typography>
                </Link>
                <Link to={'/user/view'} style={{ textDecoration: "none", color: "white" }}>
                    <Typography variant="body1" style={userNameStyle}>
                        View attendance |
                    </Typography>
                </Link>
                <Link to={'/user/apply-leave'} style={{ textDecoration: "none", color: "white" }}>
                    <Typography variant="body1" style={userNameStyle}>
                        Apply leave |
                    </Typography>
                </Link>
                <Link to={'/user/my-leave'} style={{ textDecoration: "none", color: "white" }}>
                    <Typography variant="body1" style={userNameStyle}>
                        My leaves |
                    </Typography>
                </Link>
                <Typography variant="body1" style={userNameStyle}>
                    Hello ! {user && user.name}
                </Typography>
                <IconButton onClick={logout} color="inherit">
                    <ExitIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default UserHeader;
