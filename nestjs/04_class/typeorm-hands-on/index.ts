import { datasource } from "./datasource";
import { TranslationEntity } from "./translation.entity";
import { UserEntity } from "./user.entity";

async function run() {
  await datasource.initialize();
  const user = await datasource.manager.findOne(UserEntity, {
    where: {
      id: 1001,
    },
  });

  console.log("found user", user);

  const translation = await datasource.manager.findOne(TranslationEntity, {
    where: {
      phrase: "book",
    },
  });

  if (user && translation) translation?.users.push(user);

  const insertedUser = await datasource.manager.save(translation);
  console.log("inserted user", insertedUser);
}

run();
