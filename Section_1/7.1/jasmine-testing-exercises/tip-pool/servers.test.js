describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should append new tr to serverTbody on updateServerTable()', function () {
    submitServerInfo();
    updateServerTable();

    expect(serverTbody.firstElementChild.nodeName).toBe('TR');
  });

  afterEach(function() {
    // teardown logic
    allServers = {};
    serverTbody.innerHTML = '';
  });
});
