# SFRPG
This is my personal fork of the Starfinder system definition for Foundry Virtual Tabletop, as used in roleplaying sessions at The Ruby Palace. This version is forked from a development build of [foundryvtt-starfinder](https://github.com/foundryvtt-starfinder/foundryvtt-starfinder/) somewhere in-between versions 0.27.1 and 0.28.0.

## Compatibility

Foundry v12. This is tested to work correctly on v12.331.

## Objectives of the fork

The official Starfinder system definition for Foundry is an early alpha version filled with a lot of bugs, mistakes and questionable design choices. The purpose of this fork is to allow me to fix issues promptly so that I can take advantage of those fixes immediately in my sessions (as I can't put my campaign on hold every time there's a bug, which is regularly). It is also a place where I can add homebrew rules, extend the module with custom hooks, implement experimental features, etc.

This fork will probably fall quite far behind the official version at times, as I don't really have capacity to keep it in line with the development branch. It is also likely to contain some bug fixes that have not been PR'd upstream yet, because I don't really like contributing to open source projects (it takes a toll on my mental health, which is something that I try to avoid).

### Short term objectives
* Bug fixes to the core
* Corrections to the existing content in the compendium
* Adding missing content to the compendium
* Integration of homebrew rules changes into the core (e.g. changing KAC+8 to KAC+4)
* Adding a custom weapon attack and damage roll bonus system for NPCs
* Adding hooks for my extension module, [rubicon-sfrpg](https://github.com/theleruby/rubicon-sfrpg/)

### Long term objectives
* Adding icons and artwork to most things which currently don't have any (this may end up in a private extension module to avoid copyright issues)
* Extending the system to support third-party OGL products that I own

## Current status

Development on this fork is slow. I am currently only putting in fixes required for my campaign, as I don't want to accidentally break everything and disrupt the sessions. I normally merge upstream changes when my roleplaying group goes on hiatus or is preparing for a new adventure.

## Support

I don't really intend for anyone else to use this fork, and I don't plan to provide any support for it. My primary priority is just for me and my friends to play Starfinder and to have a good time. I can nevertheless be contacted via Discord (@Theleruby) if you want to discuss this fork with me.

## How to use the fork

If you really really really must adamantly use my fork instead of the official project, here's how you get it working:

* You need a Foundry-compatible version of Node.js on PATH
* Use your favourite git-compatible source control tool to pull down this repo
* Create a folder called dist in the root of the project
* npm ci
* npm run cook
* Copy everything in the "dist" folder to the "systems/sfrpg" path of your Foundry installation

## Legal

* Game rules, mechanics, and the majority of the compendium content is licensed under the Open Game License version 1.0a (see "OGL" file).
* Permission to develop packages for Foundry is granted under the Limited License for Package Development (see https://foundryvtt.com/article/license/).
* Javascript, HTML and CSS code is licensed under the MIT License (see "LICENSE" file).
* Product Identity owned by Paizo (as defined under section 1(e) of the OGL) is used under the terms of the Paizo Community Use Policy, where allowed (see below). A duplicate of this policy is included in the repository (see "PAIZO-CUP" file).
* Some content may not be covered by any of the above; the use of this content is assumed to be covered under fair use and consumer protection laws.

I have kept this fork public in an endeavour to unofficially support the project. In the event of any legal complaints it will be made private.

### Paizo Community Use Policy
_This game system definition uses trademarks and/or copyrights owned by Paizo Inc., which are used under Paizo's Community Use Policy. We are expressly prohibited from charging you to use or access this content. This game system definition is not published, endorsed, or specifically approved by Paizo Inc. For more information about Paizo's Community Use Policy, please visit paizo.com/communityuse. For more information about Paizo Inc. and Paizo products, please visit paizo.com._

## If you like Starfinder

Please support the publishers of Starfinder and its supplementary third-party material by purchasing the game content included in this project from your favourite store (Amazon, Dungeonland, DriveThruRPG, etc).

## Other resources

* Archives of Nethys - https://www.aonsrd.com/
* Starjammer SRD - https://www.starjammersrd.com/
