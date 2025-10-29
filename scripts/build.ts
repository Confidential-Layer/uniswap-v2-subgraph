import yargs from 'yargs'

import { build, deploy } from './utils/deploy-utils'
import { validateNetwork, validateSubgraphType } from './utils/prepareNetwork'

async function main() {
  const argv = yargs(process.argv.slice(2))
    .option('network', {
      alias: 'n',
      description: 'Network to build for',
      type: 'string',
      demandOption: true,
    })
    .option('subgraph-type', {
      alias: 's',
      description: 'Type of the subgraph',
      type: 'string',
      demandOption: true,
    })
    .option('deploy', {
      alias: 'd',
      description: 'Deploy the subgraph',
      type: 'boolean',
      default: false,
    })
    .option('name', {
      alias: 'n',
      description: 'Subgraph name',
      type: 'string',
      demandOption: false,
    })
    .option('node', {
      description: 'Subgraph node',
      type: 'string',
      demandOption: false,
    })
    .option('ipfs', {
      description: 'Ipfs to deploy to',
      type: 'string',
      demandOption: false,
    })
    .option('subgraph-version', {
      alias: 'v',
      description: 'Version of the subgraph',
      type: 'string',
      default: 'v0.0.1',
    })
    .help().argv
  validateNetwork(argv.network)
  validateSubgraphType(argv.subgraphType)
  await build(argv.network, argv.subgraphType)
  if (argv.deploy) {
    if (!argv.name || !argv.node || !argv.ipfs) {
      throw new Error('GRAPH_NAME, GRAPH_NODE_ENDPOINT and IPFS_ENDPOINT must be set')
    }

    await deploy(argv.subgraphType, argv.name, argv.node, argv.ipfs, argv.subgraphVersion)
  }
}

main()
