# zkVaxCard

# Intro
ZKVarCard is a system that can verify anyone's vax records without exposing one's private info by using [Semaphore protocol](https://semaphore.appliedzkp.org/).
![image](https://user-images.githubusercontent.com/78428519/209523685-b51ababf-adb1-43fc-9b42-07cdd81e5e91.png)

# Run frontend
- cd frontend && yarn
- yarn start (may encounter some error happens in snark.js - readline, just find it in node_modules and comment it out)

# Run json server
- yarn global add json-server
- at ./zkVarCard/frontend: type "yarn json-server db.json --port 4000"

# Things need to be solved
- some error pop out when we trying to call verify in useVax, and we deem it might cause due to contract issue, yet haven't solved.

