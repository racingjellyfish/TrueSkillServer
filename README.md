# TrueSkillServer #

A JavaScript based server running the TrueSkill ranking algorithm.

## TODO:##
DONE 1) figure out how to package a module for re-use
2) explore Express/Jade
3) try the node debugger
4) deployment
DONE 5) upload true skill library code to github
6) write the server app to use the library code
7) figure out how the UI should work
8) database for storing skills
9) look into calculating handicaps from team differences, also does the actual
   match result matter, i.e. 10-9 vs 10-0
10) consider adding attack/defence flags for players and track skill separately,
    so a player might have 3 skill values, attack/defence/combined?
11) match quality display, i.e. calculate quality for all possible matches and
    display a leader board?
12) graph skills over time
13) if tracking attack/defence position separately include in match quality
    calculations
14) take intermediate calculations of team skill when combining players and rank?
15) how to handle different game formats, e.g. first to 5, is this equivalent to
    all players having a 50% partial play?
16) player registration
17) league management
18) in addition to an all-time league also implement a rolling league calculation,
    i.e. only include results from the last n days
19) figure out what match quality actually represents
20) for each match show the probability of the actual result, is this possible before
    the match is played?  see: TrueSkillFactorGraph.getProbabilityOfRanking()
21) could this be used to analyse football matches/horse races/etc?
22) DONE publish true skill library code to npm
23) ...
