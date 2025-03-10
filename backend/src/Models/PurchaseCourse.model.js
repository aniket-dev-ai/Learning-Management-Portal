const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const purchaseCourseSchema = new Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    CourseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'paypal', 'bank_transfer'],
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('PurchaseCourse', purchaseCourseSchema);