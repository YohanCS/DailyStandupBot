Hello! The repository builds on Nimbella and is based on the use case story off of the daily 15 minute meetings that many companies do. 

During agile/scrum development, companies will have a 15 minute meeting when they start off. They discuss what has been done so far, what will be worked on today, and what possible blockers may be. 

This meeting is helpful, but after a short while, it is easy to forget information about what happened in the meeting. Additionally, some people may have not been able to attend the meeting. 

Then comes these convenient slack commands, as it enables people to write bullet list points for what has been done, what needs to be worked on today, and what possible blockers may be. This helps people make better decisions, be more informed, and improve productivity.

This was built with Nimbella for the wrapper class on the Slack API service, and Firebase for persistent storage. The direct reference for the storage endpoint is https://standup-db-33e78.firebaseio.com with paths containing /standup/done.json, /standup/today.json, /standup/blockers.json

Usage: /standup [command] <param1> <param2> ... <paramN> 
Where params are provided only if mandatory. 

Commands:
/standup done <string> 
    - adds what's been completed to done list 

/standup today <string>
    - adds a task to todays list

/standup blockers <string>
    - adds a blocker to blockers list

/standup reminder-done 
    - prints done list

/standup reminder-today
    - prints today list

/standup reminder-blockers
    - prints blocker list

/standup reminder-all
    - prints all lists in order

/standup clear-done
    - clears done list

/standup clear-today
    - clears today list

/standup clear-blockers
    - clears blocker list

/standup clear-all
    - clears all lists

/standup meeting <location> 
    - prints geofence of location of HackSC venue, and used in task reminder