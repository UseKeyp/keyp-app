/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

import { memberData } from "./seed/member";
import { treasureData } from "./seed/treasure";

dotenv.config()
const db = new PrismaClient()

/*
 * Seed data is database data that needs to exist for your app to run.
 *
 * @see https://www.prisma.io/docs/reference/api-reference/command-reference#migrate-reset
 * @see https://www.prisma.io/docs/guides/prisma-guides/seed-database
 * @see https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#upsert
 * @see https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
 */
async function main() {
  console.warn('Please define your seed data.')

// // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
// // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
//   await Promise.all(
//      memberData.map(async (member) => {
//        console.log(member);
//        const record = await db.member.create({
//          data: member
//        })
//        console.log(record)
//      });
//    );
 }

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })
