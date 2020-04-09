// Frameworks
import React, { useState, useEffect, useContext } from 'react';
import * as _ from 'lodash';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Stepper from '@material-ui/core/Stepper';
import Grid from '@material-ui/core/Grid';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// App Components
import TentDescription from './TentDescription';
import TentAttributes from './TentAttributes';
import ConfirmListing from './ConfirmListing';

// App Images
import partyPopperImg from '../../../images/party-popper.png';

// Data Context for State
import { RootContext } from '../../stores/root.store';
import { TransactionContext } from '../../stores/transaction.store';


const useCustomStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

const getSteps = () => {
    return [
        'Pitch Your Tent',
        'Peg the Price',
        'Create Listing',
    ];
};

const getStepContent = ({onSubmitForm, step, back, next}) => {
    switch (step) {
        case 0:
            return (<TentDescription back={back} next={next} />);
        case 1:
            return (<TentAttributes back={back} next={next} />);
        case 2:
            return (<ConfirmListing back={back} next={onSubmitForm} />);
        default:
            return (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container direction="row" justify="flex-start" alignItems="center">
                            <Button type="button" variant="outlined" size="large" onClick={back}>back</Button>
                            <Box px={5}>Unknown Step!</Box>
                        </Grid>
                    </Grid>
                </Grid>
            );
    }
};

let _previousState = '';

function ListingWizard({ onSubmitForm }) {
    const customClasses = useCustomStyles();

    const [, rootDispatch] = useContext(RootContext);

    const [ txState ] = useContext(TransactionContext);
    const { streamState } = txState;

    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    useEffect(() => {
        if (_.isEmpty(streamState) && _previousState === 'started') {
            setActiveStep(prevActiveStep => prevActiveStep - 1);
        }
        _previousState = streamState;
    }, [streamState]);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        rootDispatch({type: 'CLEAR_LISTING_DATA'});
    };

    const _handleSubmitForm = (formData) => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        onSubmitForm(formData);
    };

    const _getFinalStepNotice = () => {
        if (activeStep === steps.length) {
            if (streamState === 'started') {
                return _getTxStartedNotice();
            } else if (!_.isEmpty(streamState)) {
                return _getTxCompletedNotice();
            }
        }
        return '';
    };

    const _getTxStartedNotice = () => {
        return (
            <Paper square elevation={0} className={customClasses.resetContainer}>
                <Grid container direction="row" justify="center" alignItems="center">
                    <img src={partyPopperImg} alt="Party Popper" style={{width: 200}} />
                </Grid>
                <Box py={3}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Typography>Transaction Started!  Please check your wallet to Sign the Transaction!</Typography>
                    </Grid>
                </Box>
            </Paper>
        );
    };

    const _getTxCompletedNotice = () => {
        return (
            <Paper square elevation={0} className={customClasses.resetContainer}>
                <Grid container direction="row" justify="center" alignItems="center">
                    <img src={partyPopperImg} alt="Party Popper" style={{width: 200}} />
                </Grid>
                <Box py={3}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Typography>Finished! Your Tent-Listing is being created!</Typography>
                    </Grid>
                </Box>
                <Box py={2}>
                    <Divider />
                </Box>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Button onClick={handleReset} variant="outlined" color="primary" className={customClasses.button}>
                        Restart
                    </Button>
                </Grid>
            </Paper>
        );
    };

    return (
        <div className={customClasses.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, step) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent component="div">
                            {
                                getStepContent({
                                    step,
                                    onSubmitForm: _handleSubmitForm,
                                    back: handleBack,
                                    next: handleNext,
                                })
                            }
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {
                _getFinalStepNotice()
            }
        </div>
    );
}

export default ListingWizard;
