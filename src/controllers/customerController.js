import createError from 'http-errors';
import Customer from '../models/customerModel';

export const getCustomerById = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        customer,
      },
    });
  } catch (err) {
    next(createError(404, err));
  }
};

export const createCustomer = async (req, res, next) => {
  try {
    const newCustomer = await Customer.create(req.body);

    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        customer: newCustomer,
      },
    });
  } catch (err) {
    next(createError(422, err));
  }
};

export const deleteCustomerById = async (req, res, next) => {
  try {
    // Delete Customer from DB
    await Customer.findByIdAndRemove(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(createError(404, err));
  }
};

export const updateCustomerById = async (req, res, next) => {
  try {
    const customerUpd = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        customer: customerUpd,
      },
    });
  } catch (err) {
    next(createError(404, err));
  }
};

export const findAll = async (req, res, next) => {
  try {
    const customers = await Customer.find();

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        results: customers.length,
        customers,
      },
    });
  } catch (err) {
    next(createError(404, err));
  }
};

export const addList = async (req, res, next) => {
  try {
    const { customersList } = req.body;

    const customers = await Customer.insertMany(customersList);

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        results: customers.length,
        customers,
      },
    });
  } catch (err) {
    next(createError(404, err));
  }
};
