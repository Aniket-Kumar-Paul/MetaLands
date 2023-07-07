const Land = artifacts.require("Land");

module.exports = async function (deployer) {
  const NAME = "metaLand";
  const SYMBOL = "ML";
  const COST = web3.utils.toWei("1", "ether");

  await deployer.deploy(Land, NAME, SYMBOL, COST);
};
