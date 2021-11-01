describe("Helpers test", function() {
  //setup
  beforeEach(function() {
    allPayments = {
      payment1: {
        billAmt: 50,
        tipAmt: 15,
        tipPercent: calculateTipPercent(50, 15)
      },
      payment2: {
        billAmt: 11,
        tipAmt: 2,
        tipPercent: calculateTipPercent(11, 2)
      }
    }
  });

  //sumPaymentTotal test
  it("should calculate payment totals correctly", function() {
    expect(sumPaymentTotal('billAmt')).toEqual(61);
    expect(sumPaymentTotal('tipAmt')).toEqual(17);
    expect(sumPaymentTotal('tipPercent')).toEqual(48);
  });

  //calculateTipPercent test
  it("should calculate tip percent correctly", function() {
    expect(calculateTipPercent(60, 15)).toEqual(25);
  });

  //appendTd test
  it("should create new td with innerText and append to tr on appendTd", function() {
    let newTr = document.createElement('tr');
    appendTd(newTr, 'test text');
    paymentTbody.appendChild(newTr);
    expect(document.querySelector('#paymentTable tbody tr').firstElementChild.nodeName).toEqual('TD');
    expect(document.querySelector('#paymentTable tbody tr').firstElementChild.innerText).toEqual('test text');
  });

  //appendDeleteBtn test
  it("should create new delete td with innerText 'X' and append to tr on appendDeleteBtn", function() {
    let newTr = document.createElement('tr');
    appendDeleteBtn(newTr);
    paymentTbody.appendChild(newTr);
    expect(document.querySelector('#paymentTable tbody tr').firstElementChild.nodeName).toEqual('TD');
    expect(document.querySelector('#paymentTable tbody tr').firstElementChild.innerText).toEqual('X');
  });

  //tear-down
  afterEach(function() {
    allPayments = {};
    let oldTr = document.querySelector('#paymentTable tbody tr');
    if (!!oldTr) {
      paymentTbody.removeChild(oldTr);
    }
  });
});
