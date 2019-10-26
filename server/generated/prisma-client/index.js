"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "CardType",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Lobby",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/adrien-boutigny-4e5f37/poule-poule/dev`
});
exports.prisma = new exports.Prisma();
