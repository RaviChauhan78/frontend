import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, Radio, RadioGroup, TextField } from '@material-ui/core';
import { addDays, startOfMonth, endOfMonth, format, addMonths } from 'date-fns';
import React, { useState } from 'react';

const DateRangePicker = ({ open, onClose, onApply }) => {
    const [selectedOption, setSelectedOption] = useState('Today');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleApply = () => {
        let start, end;

        if (selectedOption === 'Custom') {
            // Handle custom date range
            start = format(startDate, 'yyyy-MM-dd');
            end = format(endDate, 'yyyy-MM-dd');
        } else {
            // Handle other date range options
            const today = new Date();
            switch (selectedOption) {
                case 'Today':
                    start = end = format(today, 'yyyy-MM-dd');
                    break;
                case 'Yesterday':
                    const yesterday = addDays(today, -1);
                    start = end = format(yesterday, 'yyyy-MM-dd');
                    break;
                case 'Last 7 Days':
                    start = format(addDays(today, -6), 'yyyy-MM-dd');
                    end = format(today, 'yyyy-MM-dd');
                    break;
                case 'Last 30 Days':
                    start = format(addDays(today, -29), 'yyyy-MM-dd');
                    end = format(today, 'yyyy-MM-dd');
                    break;
                case 'This Month':
                    start = format(startOfMonth(today), 'yyyy-MM-dd');
                    end = format(endOfMonth(today), 'yyyy-MM-dd');
                    break;
                case 'Last Month':
                    const lastMonth = addMonths(today, -1);
                    start = format(startOfMonth(lastMonth), 'yyyy-MM-dd');
                    end = format(endOfMonth(lastMonth), 'yyyy-MM-dd');
                    break;
                default:
                    // Default to custom range
                    start = format(startDate, 'yyyy-MM-dd');
                    end = format(endDate, 'yyyy-MM-dd');
                    break;
            }
        }

        onApply(selectedOption, start, end);
        onClose();
    };


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Select Date Range</DialogTitle>
            <DialogContent>
                <RadioGroup
                    aria-label="date-range"
                    name="date-range"
                    value={selectedOption}
                    onChange={handleOptionChange}
                >
                    <Grid container spacing={1}>

                        <Grid item xs={12} sm={6} md={6}>
                            <FormControlLabel value="Today" control={<Radio color='primary' />} label="Today" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <FormControlLabel value="Yesterday" control={<Radio color='primary' />} label="Yesterday" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <FormControlLabel value="Last 7 Days" control={<Radio color='primary' />} label="Last 7 Days" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <FormControlLabel value="Last 30 Days" control={<Radio color='primary' />} label="Last 30 Days" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <FormControlLabel value="This Month" control={<Radio color='primary' />} label="This Month" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <FormControlLabel value="Last Month" control={<Radio color='primary' />} label="Last Month" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <FormControlLabel value="Custom" control={<Radio color='primary' />} label="Custom Range" />
                        </Grid>
                    </Grid>
                </RadioGroup>
                {selectedOption === 'Custom' && (
                    <Grid container spacing={1} className='my-1'>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                variant="outlined"
                                label="From Date"
                                type="date"
                                name='from'
                                className='w-100'
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={format(startDate, 'yyyy-MM-dd')}
                                onChange={(e) => setStartDate(new Date(e.target.value))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                variant="outlined"
                                label="To Date"
                                type="date"
                                name='to'
                                className='w-100'
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputProps: {
                                        min: format(startDate, 'yyyy-MM-dd'), // This is the minimum date value you want to set
                                    },
                                }}
                                value={format(endDate, 'yyyy-MM-dd')}
                                onChange={(e) => setEndDate(new Date(e.target.value))}
                            />
                        </Grid>
                    </Grid>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleApply} color="primary">
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DateRangePicker;
