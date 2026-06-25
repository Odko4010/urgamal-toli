import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import data from './urgamal_data.json'
import 'dotenv/config'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')
  await prisma.urgamal.deleteMany()
  let count = 0
  for (const plant of data as any[]) {
    await prisma.urgamal.create({
      data: {
        mn_code: plant.mn_code,
        mn_name: plant.mn_name,
        lat_code: plant.lat_code,
        latin_name: plant.latin_name || null,
        nas: plant.nas,
        amjdral_helber: plant.amjdral_helber || '',
        aj_ahuin_bueleg: plant.aj_ahuin_bueleg || null,
      }
    })
    count++
    if (count % 100 === 0) console.log('Inserted ' + count + '...')
  }
  console.log('Seeded ' + count + ' plants')
}

main()
  .catch(console.error)
  .finally(async () => { await prisma.disconnect() })
