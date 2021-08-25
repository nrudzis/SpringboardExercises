describe("Servers test (with setup and tear-down)", function() {
  //setup
  beforeEach(function () {
    serverNameInput.value = 'Alice';
  });
  
  //submitServerInfo test
  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  //updateServerTable test
  it('should append new tr to serverTbody on updateServerTable()', function () {
    submitServerInfo();
    updateServerTable();
    expect(serverTbody.firstElementChild.nodeName).toBe('TR');
  });

  //teardown
  afterEach(function() {
    allServers = {};
    serverTbody.innerHTML = '';
  });
});
