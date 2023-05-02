/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
class OrderDTO {
  constructor(orderData) {
    this.id = orderData.id;
    this.parentId = orderData.parent_id;
    this.status = orderData.status;
    this.currency = orderData.currency;
    this.version = orderData.version;
    this.pricesIncludeTax = orderData.prices_include_tax;
    this.dateCreated = new Date(orderData.date_created);
    this.dateModified = new Date(orderData.date_modified);
    this.discountTotal = parseFloat(orderData.discount_total);
    this.discountTax = parseFloat(orderData.discount_tax);
    this.shippingTotal = parseFloat(orderData.shipping_total);
    this.shippingTax = parseFloat(orderData.shipping_tax);
    this.cartTax = parseFloat(orderData.cart_tax);
    this.total = parseFloat(orderData.total);
    this.totalTax = parseFloat(orderData.total_tax);
    this.customerId = orderData.customer_id;
    this.orderKey = orderData.order_key;
    this.billing = orderData.billing;
    this.shipping = orderData.shipping;
    this.paymentMethod = orderData.payment_method;
    this.paymentMethodTitle = orderData.payment_method_title;
    this.transactionId = orderData.transaction_id;
    this.customerIpAddress = orderData.customer_ip_address;
    this.customerUserAgent = orderData.customer_user_agent;
    this.createdVia = orderData.created_via;
    this.customerNote = orderData.customer_note;
    this.dateCompleted = orderData.date_completed ? new Date(orderData.date_completed) : null;
    this.datePaid = orderData.date_paid ? new Date(orderData.date_paid) : null;
    this.cartHash = orderData.cart_hash;
    this.number = orderData.number;
    this.metaData = orderData.meta_data;
    this.lineItems = orderData.line_items;
    this.taxLines = orderData.tax_lines;
    this.shippingLines = orderData.shipping_lines;
    this.feeLines = orderData.fee_lines;
    this.couponLines = orderData.coupon_lines;
    this.refunds = orderData.refunds;
    this.paymentUrl = orderData.payment_url;
    this.isEditable = orderData.is_editable;
    this.needsPayment = orderData.needs_payment;
    this.needsProcessing = orderData.needs_processing;
    this.dateCreatedGmt = new Date(orderData.date_created_gmt);
    this.dateModifiedGmt = new Date(orderData.date_modified_gmt);
    this.dateCompletedGmt = orderData.date_completed_gmt ? new Date(orderData.date_completed_gmt) : null;
    this.datePaidGmt = orderData.date_paid_gmt ? new Date(orderData.date_paid_gmt) : null;
    this.currencySymbol = orderData.currency_symbol;
    this.links = orderData._links;
  }
}
export default OrderDTO;
