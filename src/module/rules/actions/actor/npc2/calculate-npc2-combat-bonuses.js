import { SFRPGEffectType, SFRPGModifierType, SFRPGModifierTypes } from "../../../../modifiers/types.js";

export default function(engine) {
    engine.closures.add("calculateNPC2CombatBonuses", (fact, context) => {
        const data = fact.data;

        const highAttackBonus = data.attributes.highAttackBonus;
        const highDamageBonus = data.attributes.highDamageBonus;
        const lowAttackBonus = data.attributes.lowAttackBonus;
        const lowDamageBonus = data.attributes.lowDamageBonus;
        const specialAttackBonus = data.attributes.specialAttackBonus;
        const specialDamageBonus = data.attributes.specialDamageBonus;
        [highAttackBonus, highDamageBonus, lowAttackBonus, lowDamageBonus, specialAttackBonus, specialDamageBonus].forEach((bonus) => {
            bonus.total = bonus.base;
            bonus.tooltip = [];
            bonus.tooltip.push(game.i18n.format("SFRPG.NPCSheet.CombatBonuses.BaseModifier", {base: bonus.base.signedString()}));
        });

        // Apply base attack bonus modifiers to the attack bonuses
        const addModifier = (bonus, data, items, localizationKey) => {
            if (bonus.modifierType === SFRPGModifierType.FORMULA) {
                items.forEach((item) => {
                    if (item.rolledMods) {
                        item.rolledMods.push({mod: bonus.modifier, bonus: bonus});
                    } else {
                        item.rolledMods = [{mod: bonus.modifier, bonus: bonus}];
                    }
                });

                return 0;
            }

            let computedBonus = 0;
            try {
                const roll = Roll.create(bonus.modifier.toString(), data).evaluateSync({strict: false});
                computedBonus = roll.total;
            } catch {
                // pass
            }

            if (computedBonus !== 0 && localizationKey) {
                items.forEach((item) => {
                    item.tooltip.push(game.i18n.format(localizationKey, {
                        type: game.i18n.format(`SFRPG.ModifierType${bonus.type.capitalize()}`),
                        mod: computedBonus.signedString(),
                        source: bonus.name
                    }));
                });
            }

            return computedBonus;
        };

        // Iterate through any modifiers that affect BAB
        let filteredModifiers = fact.modifiers.filter(mod => {
            return (mod.enabled || mod.modifierType === "formula") && mod.effectType === SFRPGEffectType.BASE_ATTACK_BONUS;
        });
        filteredModifiers = context.parameters.stackModifiers.process(filteredModifiers, context, {actor: fact.actor});

        const bonus = Object.entries(filteredModifiers).reduce((sum, mod) => {
            if (mod[1] === null || mod[1].length < 1) return sum;

            if ([SFRPGModifierTypes.CIRCUMSTANCE, SFRPGModifierTypes.UNTYPED].includes(mod[0])) {
                for (const bonus of mod[1]) {
                    sum += addModifier(bonus, data, [highAttackBonus, lowAttackBonus, specialAttackBonus], "SFRPG.AbilityScoreBonusTooltip");
                }
            } else {
                sum += addModifier(mod[1], data, [highAttackBonus, lowAttackBonus, specialAttackBonus], "SFRPG.AbilityScoreBonusTooltip");
            }

            return sum;
        }, 0);

        highAttackBonus.total += bonus;
        lowAttackBonus.total += bonus;
        specialAttackBonus.total += bonus;

        return fact;

    }, { required: ["stackModifiers"], closureParameters: ["stackModifiers"] });
}
