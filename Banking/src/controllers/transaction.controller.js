const transactionModel = require('../models/transaction.model')
const ledgerModel = require('../models/ledger.model')
const accountModel = require('../models/account.model');
const { default: mongoose } = require('mongoose');
const emailService = require('../services/email.service')

/**
 * for creating a new transaction
 * 1.validate request
 * 2.validate idempotency key
 * 3.check account status
 * 4.Derive sender balance from  ledger
 * 5.Create transaction (PENDING)
 * 6.create Debit ledger entry
 * 7.create Credit ledger entry
 * 8. Mark transaction complete
 * 9.Commit MongoDB session
 * 10.Send email notification
 */


/** 
 * 1.Validate request
*/
async function createTransaction(req,res){
    const {fromAccount, toAccount, amount, idempotencyKey} = req.body;
    if(!fromAccount || !toAccount || !amount ||idempotencyKey){
        res.status(400).json({
            message:"All fields fromAccount, .....,idempotency are required"
        })
    }
 const fromUserAccount = await mongoose.findOne({
    _id:fromAccount
 })
 const toUserAccount = await mongoose.findOne({
    _id:toAccount
 })

 if(!fromUserAccount || !toUserAccount){
    return res.status(404).json({
        message:"Invalid fromAccount or toAccount"
    })
 }
/** 
 * 2.Validate idempotency key
*/
const isTransactionAlreadyExist = await transactionModel.findOne({
    idempotencyKey: idempotencyKey
})
if(isTransactionAlreadyExist){
    if(isTransactionAlreadyExist.status === "COMPLETED"){
      return  res.status(200).json({
            message:"transaction already processed",
            transaction: isTransactionAlreadyExist
        })
    }
    if(isTransactionAlreadyExist.status === "PENDING"){
       return res.status(200).json({
            message:"transaction is still processing",
            transaction: isTransactionAlreadyExist
        })
    }
      if(isTransactionAlreadyExist.status === "FAILED"){
       return res.status(500).json({
            message:"transaction is FAILED",
            transaction: isTransactionAlreadyExist
        })
    }
      if(isTransactionAlreadyExist.status === "REVERSED"){
       return res.status(500).json({
            message:"transaction is Reversed",
            transaction: isTransactionAlreadyExist
        })
    }
}
/** 
 * 3.Check Account Status
*/
if(fromUserAccount.status !== "ACTIVE"  || toUserAccount.status !=="ACTIVE"){
    return res.status(400).json({
        message:"Both fromAccount and toAccount must be Active to processed the transaction."
    })
}
/** 
 * 4. Derive sender balance from  ledger
*/
 const balance = await fromUserAccount.getBalance()
 if(balance< amount){
    res.status(400).json({
        message:`Insufficient balance. Current balance is  ${balance}`
    })
 }
 /** 
  * 5. Create Transaction
 */
const session = await mongoose.startSession();
session.startTransaction();
const transaction = await transactionModel.create({
    fromAccount,
    toAccount,
    amount,
    idempotencyKey,
    status:"PENDING"
},{session})

const debitLedgerEntry = await ledgerModel.create({
    account:"fromAccount",
    amount: amount,
    transaction: transaction._id,
    type:"CREDIT"
},{session})

const creditLedgerEntry = await ledgerModel.create({
    account:"toAccount",
    amount: amount,
    transaction: transaction._id,
    type:"CREDIT"
},{session})

transaction.status = "COMPLETED"
await transaction.save({session})

await session.commitTransaction()
session.endSession()

/** 
 * 10. Send email notification
*/
await emailService.sendTransactionEmail(req.user.email,req.user.name,amount,toAccount)

return res.status(201).json({
    message:"Transaction completed successfully",
    transaction: transaction
})

}

module.exports = { createTransaction }
