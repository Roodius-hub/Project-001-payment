import prisma from "../src/client.ts";
import bcrypt from "bcrypt";

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: "2222222" },
    update: {},
    create: {
      number: "22222222",
      password: await bcrypt.hash("alice", 10),
      name: "alice",
      Balance: {
        create: {
          amount: 20000,
          locked: 0,
        },
      },
      OnRampTransaction: {
          create: {
            startTime: new Date(),
            status:"Success",
            amount:2000,
            token:"token_1",
            provider:"HDFC bank",
        },
      },
    },
  });
  
  const bob = await prisma.user.upsert({
    where: {number:'222222222'},
    update:{},
    create:{
      number: '22222222222',
      password: await bcrypt.hash('bob', 10),
      name: 'bob',
      Balance: {
        create: {
          amount:3000,
          locked:0
        }
      },
      OnRampTransaction:{
        create:{
          startTime: new Date(),
          status:'Failure',
          amount:3000,
          token:'token_2',
          provider:'HDFC Bank'
        }
      }
    },  
  })

  console.log({alice,bob});

}

main()
.then( async() => {
  await prisma.$disconnect()
})
.catch((e) => {
  console.log(e)
})