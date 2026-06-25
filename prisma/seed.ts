import { PrismaClient } from '@prisma/client'
import data from './urgamal_data.json'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')
  
  // Clear existing data
  await prisma.urgamal.deleteMany()
  
  // Insert all plants
  let count = 0
  for (const plant of data as any[]) {
    await prisma.urgamal.create({
      data: {
        mn_code: plant.mn_code,
        mn_name: plant.mn_name,
        lat_code: plant.lat_code,
        latin_name: plant.latin_name || null,
        nas: plant.nas,
        amjdral_helber: plant['amjdral_helbер'] || plant.amjdral_helber || '',
        aj_ahuin_bueleg: plant.aj_ahuin_bueleg || null,
      }
    })
    count++
  }
  
  console.log(`✅ Seeded ${count} plants`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
