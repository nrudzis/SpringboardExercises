describe("Payments tests", function() {
  //setup
  beforeEach(function() {
    paymentId = 0;
    billAmtInput.value = 40;
    tipAmtInput.value = 15;
  });

  //submitPaymentInfo tests
  it("should add object to allPayments", function() {
    submitPaymentInfo();
    expect(Object.entries(allPayments).length).toEqual(1);
  });

  it("should update html", function() {
    submitPaymentInfo();
    let payment1 = document.querySelector('#payment1').childNodes;
    expect(payment1[0].innerHTML).toEqual('$40');
    expect(payment1[1].innerHTML).toEqual('$15');
    expect(payment1[2].innerHTML).toEqual('38%');
  });

  //createCurPayment tests
  it("should return undefined with empty inputs", function() {
    billAmtInput.value = '';
    expect(createCurPayment()).toBeUndefined();
  });

  it("should return undefined with negative inputs", function() {
    tipAmtInput.value = -10;
    expect(createCurPayment()).toBeUndefined();
  });

  //appendPaymentTable test
  it("should append tr to to paymentTbody", function() {
    curPayment = createCurPayment();
    appendPaymentTable(curPayment);
    expect(paymentTbody.firstElementChild.nodeName).toEqual('TR');
  });

  //updateSummary test
  it("should update summary table with calculated sum of all payments", function() {
    curPayment = createCurPayment();
    paymentId += 1;
    allPayments['payment' + paymentId] = curPayment;
    updateSummary();
    expect(summaryTds[0].innerHTML).toEqual('$40');
    expect(summaryTds[1].innerHTML).toEqual('$15');
    expect(summaryTds[2].innerHTML).toEqual('38%');
  });
  
  //tear-down
  afterEach(function() {
    summaryTds[0].innerHTML = '';
    summaryTds[1].innerHTML = '';
    summaryTds[2].innerHTML = '';
    paymentTbody.innerHTML = '';
    billAmtInput.value = '';
    tipAmtInput.value = '';
  });
});
