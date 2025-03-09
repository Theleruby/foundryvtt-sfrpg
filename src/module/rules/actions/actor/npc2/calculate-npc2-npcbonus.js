import { SFRPGEffectType, SFRPGModifierType, SFRPGModifierTypes } from "../../../../modifiers/types.js";

export default function(engine) {
    engine.closures.add("calculateNPC2NpcBonus", (fact, context) => {
        const data = fact.data;

        const weaponTypeArray = Object.keys(CONFIG.SFRPG.weaponTypes).concat(["equipment"]);
        const bonusData = data.npcBonus ?? {};
        for (const weaponType of ["base", "standard", "gunnery"].concat(weaponTypeArray)) {
            const hasNoDamageValue = ["base", "grenade", "gunnery"].includes(weaponType);
            const weaponData =  {
                "attack": {
                    "value": bonusData[weaponType]?.attack?.value ?? 0,
                    "mod": 0
                },
                "damage": {
                    "value": hasNoDamageValue ? 0 : bonusData[weaponType]?.damage?.value ?? 0,
                    "mod": 0
                }
            };
            // attack bonus
            weaponData.attack.mod = weaponData.attack.value;
            if (weaponType !== "base") {
                weaponData.attack.mod += bonusData.base.attack.value;
                if (weaponTypeArray.includes(weaponType)) {
                    weaponData.attack.mod += bonusData.standard.attack.value;
                }
            }
            // damage bonus
            if (!["base", "grenade", "gunnery"].includes(weaponType)) {
                weaponData.damage.mod = weaponData.damage.value;
                if (weaponType !== "standard") {
                    weaponData.damage.mod += bonusData.standard.damage.value;
                }
            }
            bonusData[weaponType] = weaponData;
        }
        data.npcBonus = bonusData;

        const addModifier = (bonus, data) => {
            let computedBonus = 0;
            try {
                const roll = Roll.create(bonus.modifier.toString(), data).evaluateSync({ strict: false });
                computedBonus = roll.total;
            } catch {
                // pass
            }
            return computedBonus;
        };

        // Iterate through any modifiers that affect BAB
        let filteredModifiers = fact.modifiers.filter(mod => {
            return mod.enabled && mod.modifierType === SFRPGModifierType.CONSTANT && mod.effectType === SFRPGEffectType.BASE_ATTACK_BONUS;
        });
        filteredModifiers = context.parameters.stackModifiers.process(filteredModifiers, context, {actor: fact.actor});

        const bonus = Object.entries(filteredModifiers).reduce((sum, mod) => {
            if (mod[1] === null || mod[1].length < 1) return sum;

            if ([SFRPGModifierTypes.CIRCUMSTANCE, SFRPGModifierTypes.UNTYPED].includes(mod[0])) {
                for (const bonus of mod[1]) {
                    sum += addModifier(bonus, data);
                }
            } else {
                sum += addModifier(mod[1], data);
            }

            return sum;
        }, 0);

        for (const weaponType of ["base", "standard", "gunnery"].concat(weaponTypeArray)) {
            data.npcBonus[weaponType].attack.mod += bonus;
        }

        return fact;
    }, { required: ["stackModifiers"], closureParameters: ["stackModifiers"] });
}
