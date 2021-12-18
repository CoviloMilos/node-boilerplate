import { createMapper, mapFrom } from "@automapper/core";
import { classes } from "@automapper/classes";
import { BaseDomain, BaseDto, HelloWorldClass, HelloWorldDto, UserSubSetDomain, UserSubSetDto } from ".";
import { mongoose } from "@typegoose/typegoose";

export const objectMapper = createMapper({
  name: "object-mapper",
  pluginInitializer: classes,
});

objectMapper.createMap(BaseDomain, BaseDto);
objectMapper.createMap(BaseDto, BaseDomain);

objectMapper.createMap(HelloWorldClass, HelloWorldDto).forMember(
  (destination) => destination.id,
  mapFrom((source) => source._id.toString()),
);
objectMapper.createMap(HelloWorldDto, HelloWorldClass).forMember(
  (destination) => destination._id,
  mapFrom((source) => {
    if (source.id) return new mongoose.Types.ObjectId(source.id);
    return new mongoose.Types.ObjectId();
  }),
);

objectMapper.createMap(UserSubSetDomain, UserSubSetDto);
objectMapper.createMap(UserSubSetDto, UserSubSetDomain);
