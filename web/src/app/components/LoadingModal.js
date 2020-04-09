// Frameworks
import React from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Custom Styles
import useRootStyles from '../layout/styles/root.styles';


const LoadingModal = ({ isOpen, title, progress }) => {
    const classes = useRootStyles();
    return (
        <Modal
            aria-labelledby="loading-modal-title"
            aria-describedby="loading-modal-description"
            open={isOpen}
        >
            <div className={classes.simpleModal}>
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="flex-start"
                    spacing={3}
                >
                    <Grid item xs={4}>
                        <CircularProgress />
                    </Grid>
                    <Grid item xs={8} pl={10}>
                        <Typography variant="h6" id="loading-modal-title">
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" id="loading-modal-description">
                            {progress}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </Modal>
    )
};

export default LoadingModal;
