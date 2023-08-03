import React from 'react'
import { Avatar, Badge, ListItem, ListItemAvatar, ListItemText, Stack, Typography, styled } from '@mui/material'



const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));


const Story = ({id, storyImg, userName, userStatus}) => {
  return (
    <>
        <ListItem className="px-0" sx={{flexDirection: 'column'}}>
            <ListItemAvatar>
                {/* <Avatar src={'./'}  /> */}
                <Stack direction="row" spacing={2}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar alt={ userName } src={ storyImg } sx={{height: '3.5em', width: '3.5em'}} />
                    </StyledBadge>
                </Stack>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography className="" color="var(--bs-light-text-emphasis)">
                        { userName }
                    </Typography>
                }
            />
        </ListItem>
    </>
  )
}

export default Story