const { Telegraf, Markup, Scenes } = require("telegraf");
const { City, Area } = require("./models");

const BOT_TOKEN = "5129894885:AAEgGrbFEEFPF8joOQapz-CnuF8rKz2bGwE";

const scenarioTypeScene = new Scenes.BaseScene("SCENARIO_TYPE_SCENE_ID");

const stage = new Scenes.Stage([scenarioTypeScene]);

scenarioTypeScene.enter((ctx) => {
  ctx.session.myData = {};
  ctx.reply(
    "What is your drug?",
    Markup.inlineKeyboard([
      Markup.callbackButton("Movie", "hh"),
      Markup.callbackButton("Theater", "hh25"),
    ]).extra()
  );
});

const bot = new Telegraf(BOT_TOKEN);
bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));

async function getCities() {
  const cities = await City.findAll();
  return cities;
}

async function getAreas(id) {
  const areas = await Area.findAll({
    where: {
      cityId: id,
    },
  });

  return areas;
}

bot.hears("location", async (ctx) => {
  const locations = await getCities();
  const buttons = [
    ...locations.map((location) =>
      Markup.button.callback(location.name, "city_selector/" + location.id)
    ),
  ];
  const reply = Markup.inlineKeyboard([buttons]).resize();

  ctx.reply("Choose city", reply);
});

const handleAction = (action) => {
  console.log("ACTION IS", action);

  return true;
};

const ACTIONS = {
  city_selector: async (ctx, payload) => {
    console.log("HELLO BITCHES", payload);
    const areas = await getAreas(payload);

    const buttons = [
      ...areas.map((area) =>
        Markup.button.callback(area.name, "area_selector/" + area.id)
      ),
    ];

    const reply = Markup.inlineKeyboard([buttons]).resize();

    ctx.reply("Choose area", reply);
  },

  area_selector: async (ctx, payload) => {
    console.log("ENTER SCENE");
    const buttons = [Markup.button.callback("", "send_ticket/" + payload)];
    scenarioTypeScene.enter();
  },
};

bot.action(handleAction, (ctx) => {
  const [action, payload] = ctx.update.callback_query.data.split("/") || [];
  const actionHandler = ACTIONS[action] || null;

  if (actionHandler) {
    actionHandler(ctx, payload);
  }

  console.log("ACTION IS", action);
  console.log("PAYLOAD IS", payload);
});

bot.use(stage.middleware());

bot.launch();
