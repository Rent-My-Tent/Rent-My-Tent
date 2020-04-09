// Frameworks
import React, { useState, useEffect, useContext } from 'react';

// App Components
import { Helpers } from '../../../utils/helpers';
import { useDebounce } from '../../../utils/use-debounce';

// Data Context for State
import { RootContext } from '../../stores/root.store';

// Material UI
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';

// Custom Styles
import useRootStyles from '../../layout/styles/root.styles';

const customFeeSettings = {
    'higher': {min: 100, max: 1000, step: 10},
    'lower': {min: 10, max: 100, step: 1},
};


const TentAttributes = ({ back, next }) => {
    const classes = useRootStyles();

    const [ rootState, rootDispatch ] = useContext(RootContext);
    const { tentListingData } = rootState;

    const [tentPrice,     setTentPrice]     = useState(tentListingData.tentPrice || 35);
    const [tentPriceMode, setTentPriceMode] = useState(tentListingData.tentPrice > customFeeSettings.lower.max ? 'higher' : 'lower');

    const debouncedTentPrice = useDebounce(tentPrice, 500);

    useEffect(() => {
        (async () => {
            const ethPrice = await Helpers.getUsdToEth(debouncedTentPrice);
            rootDispatch({
                type    : 'UPDATE_LISTING_DATA',
                payload : {tentPrice, ethPrice}
            });
        })();
    }, [
        debouncedTentPrice,
    ]);

    const updateTentPrice = evt => {
        setTentPrice(evt.target.value);
    };

    const slideTentPrice = (evt, newValue) => {
        setTentPrice(newValue);
    };

    const toggleHigherFees = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        setTentPrice(customFeeSettings.lower.max);
        setTentPriceMode(tentPriceMode === 'lower' ? 'higher' : 'lower');
    };

    const _handleSubmit = async evt => {
        evt.preventDefault();
        next();
    };

    return (
        <>
            <Box py={2}>
                <Grid container spacing={3} className={classes.gridRow}>
                    <Grid item xs={12}>
                        <Grid container spacing={0}>
                            <Grid item xs={1} sm={2}>&nbsp;</Grid>
                            <Grid item xs={6} sm={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-amount">Tent Price</InputLabel>
                                    <OutlinedInput
                                        id="tentPriceId"
                                        value={tentPrice}
                                        labelWidth={85}
                                        type="number"
                                        fullWidth
                                        min={customFeeSettings[tentPriceMode].min}
                                        max={customFeeSettings[tentPriceMode].max}
                                        step={customFeeSettings[tentPriceMode].step}
                                        onChange={updateTentPrice}
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3} sm={2}>
                                <Box py={1} px={2}>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        size="large"
                                        onClick={toggleHigherFees}
                                    >
                                        {tentPriceMode === 'higher' ? 'lower' : 'higher'}
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={1} sm={2}>&nbsp;</Grid>
                        </Grid>

                        <Grid container spacing={0}>
                            <Grid item xs={1} sm={2}>&nbsp;</Grid>
                            <Grid item xs={10} sm={8}>
                                <Slider
                                    min={customFeeSettings[tentPriceMode].min}
                                    max={customFeeSettings[tentPriceMode].max}
                                    step={customFeeSettings[tentPriceMode].step}
                                    value={tentPrice}
                                    onChange={slideTentPrice}
                                />
                            </Grid>
                            <Grid item xs={1} sm={2}>&nbsp;</Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            <Divider />

            <Box py={2}>
                <Grid container spacing={3} className={classes.gridRow}>
                    <Grid item xs={12} sm={6}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                            className={classes.gridRow}
                        >
                            <Button
                                type="button"
                                variant="outlined"
                                size="large"
                                onClick={back}
                            >
                                back
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                            className={classes.gridRow}
                            style={{textAlign:'right'}}
                        >
                            <Button
                                type="button"
                                variant={'contained'}
                                color={'primary'}
                                size="large"
                                onClick={_handleSubmit}
                            >
                                next
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
};

export default TentAttributes;
