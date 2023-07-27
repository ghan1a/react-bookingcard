import React, { useState, useEffect } from 'react';
import Moment from 'moment';

const Form = () => {
    const [formData, setFormData] = useState({
        fromDate: null,
        toDate: null,
        numOfPeople: 0,
        totalDays: 0,
        totalCharges: 0,
        servicesAdded: [
            {
                name: 'kayak',
                fee: 50,
                selected: true,
            },
            {
                name: 'captain',
                fee: 380,
                selected: true,
            },
        ],
    });

    const [bookingClicked, setBookingClicked] = useState(false);

    const { fromDate, toDate, numOfPeople, totalCharges, totalDays, servicesAdded } = formData;

    const comissionFees = 430;

    useEffect(() => {
        calculateTotalCharges();
    }, [fromDate, toDate, numOfPeople, servicesAdded]);

    const onChange = (e) => {
        if (e.target.name === 'captain' || e.target.name === 'kayak') {
            const selectedService = e.target.name;
            const updatedServicesAdded = servicesAdded.map((service) =>
                service.name === selectedService ? { ...service, selected: !service.selected } : service
            );

            setFormData({ ...formData, servicesAdded: updatedServicesAdded });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.name === 'numOfPeople' ? parseInt(e.target.value, 10) : e.target.value });
        }
    };

    const getServiceFees = () => {
        return servicesAdded.filter((service) => service.selected).map((service) => service.fee);
    };

    const calculateTotalCharges = () => {
        const from = Moment(fromDate);
        const to = Moment(toDate);
        const daysDiff = to.diff(from, 'days');

        const serviceFees = getServiceFees();

        let totalCharges = (daysDiff * 420) + comissionFees;
        if (serviceFees.length > 0) {
            totalCharges += serviceFees.reduce((acc, fee) => acc + fee, 0);
        }

        setFormData({
            ...formData,
            totalDays: daysDiff,
            totalCharges: totalCharges,
        });
    };

    const onSubmit = () => {
        if (toDate && fromDate && numOfPeople) {
            setBookingClicked(true);
        } else {
            alert('Please select date and number of people');
        }
    };

    return (
        <div className='col-md-12'>
            <div className='container d-flex' style={{ justifyContent: 'center' }}>
                <div className='card p-4'>
                    <p className='para1 mb-4'>
                        <b>€ 420 /per day</b>
                    </p>

                    <div className='d-flex mb-4 space-between'>
                        <div className='ez form-group ml-0'>
                            <label>From</label>&nbsp;&nbsp;&nbsp;
                            <input className='date form-control' name='fromDate' value={fromDate} onChange={onChange} type='date' />
                        </div>
                        <div className='ez form-group'>
                            <label>To</label>&nbsp;&nbsp;&nbsp;
                            <input className='date form-control' name='toDate' value={toDate} onChange={onChange} type='date' />
                        </div>
                    </div>

                    <div className='form-group'>
                        <input className='capacity form-control' onChange={onChange} type='number' name='numOfPeople' value={numOfPeople} />
                    </div>

                    <button
                        className='btn btn-info mb-4'
                        onClick={() => {
                            if (toDate && fromDate && numOfPeople) {
                                setBookingClicked(true);
                            } else {
                                alert('Please select date and number of people');
                            }
                        }}
                    >
                        Book
                    </button>
                    <p className='para2 mb-4'>You will not be charged yet</p>

                    <div className='d-flex space-between'>
                        <p className='mb-0'>
                            <small>€ 420 x {totalDays} Days</small>
                        </p>
                        <p className='mb-0'>
                            <small>€ {420 * totalDays}</small>
                        </p>
                    </div>
                    <hr />

                    <div className='d-flex mb-2 space-between'>
                        <p>
                            <small>Additional Services</small>
                        </p>
                        <p>
                            <small>€ 430</small>
                        </p>
                    </div>

                    <div className='form-group'>
                        <div className='d-flex space-between mb-0'>
                            <div className='ez2'>
                                <input
                                    type='checkbox'
                                    disabled={!bookingClicked}
                                    checked={servicesAdded.find((x) => x.name === 'captain').selected}
                                    name='captain'
                                    onChange={onChange}
                                />
                                &nbsp;&nbsp;&nbsp;
                                <small className='ml-3'>Captain</small>
                            </div>
                            <p className='mb-0'>
                                <small>€ 380</small>
                            </p>
                        </div>

                        <div className='d-flex space-between mb-0'>
                            <div className='ez2'>
                                <input
                                    type='checkbox'
                                    disabled={!bookingClicked}
                                    checked={servicesAdded.find((x) => x.name === 'kayak').selected}
                                    name='kayak'
                                    onChange={onChange}
                                />
                                &nbsp;&nbsp;&nbsp;
                                <small>Kayak</small>
                            </div>
                            <p className='mb-0'>
                                <small>€ 50</small>
                            </p>
                        </div>
                    </div>

                    <hr />

                    <div className='d-flex space-between'>
                        <p className='mb-0'>
                            <small>Commission Fees</small>
                        </p>
                        <p className='mb-0'>
                            <small>€ 430</small>
                        </p>
                    </div>

                    <hr />

                    <div className='d-flex mb-2 space-between'>
                        <p>
                            <b>Total</b>
                        </p>
                        <p>
                            <b>{totalCharges ? totalCharges : ""} €</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;