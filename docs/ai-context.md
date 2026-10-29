       <!-- style explain top recipe -->

Project: HireHub, a Job Portal + Application Tracker
Stack: Node.js (ES modules), Express, MongoDB + Mongoose, React
Folders: server/, client/, docs/
Me: React developer, learning backend. Explain simply.
Done so far: server setup, GET /


Habits:

Ask one question at a time.
Paste the exact error, not “it doesn’t work”.
Try for 15 minutes alone before asking.
Always run the code. The terminal is the judge, not the AI.

     <!-- debuging recipe -->
CONTEXT: Job Portal, Express, I'm a beginner in backend.
GOAL:    what I wanted to happen
CODE:    only the function that fails
ERROR:   exact error text
TRIED:   what I already tried
RULES:   explain WHY it happened first, then give the smallest fix

The TRIED line is new. It stops AI from repeating what you already did, and it shows you your own thinking.

Rule: after AI fixes a bug, write one line in your log: “The bug was ___ because ___.” If you can’t write it, you haven’t learned it yet


            <!-- user after code work seinour lvl recipe -->

            CONTEXT: Job Portal, Express, I'm a beginner in backend.
CODE:    (paste your finished function)
TASK:    Review this like a senior developer.
         1. Find bugs or edge cases I missed.
         2. Tell me one thing that could be cleaner.
         3. Rank your points from most to least important.
RULES:   Don't rewrite the whole thing. Explain each point in 1-2 lines.

Then you decide. For every suggestion write “accept” or “reject” with one reason. Blindly accepting everything is the same as copying.

Bonus prompt: “Give me 8 URLs to test this endpoint, including weird ones that might break it.” AI is great at inventing test cases you didn’t think of.

         <!--  useing post test data and test cases  racipe -->
      

      CONTEXT: Job Portal API using Express.js. A job has these fields:
- title (string)
- company (string)
- location (string)
- type (Full-time, Internship, or Part-time)
- salary (yearly salary in INR, number)
- skills (array of strings)

TASK: Generate 8 realistic jobs for the Indian IT market as a JSON array. Use made-up company names. Include different locations, job types, salary amounts, and skills.

RULES:
- Return valid JSON only.
- No comments.
- Use exactly these six fields for every job.
- Use numbers for salary, not strings.
- Use an array of strings for skills.



                            <!-- part 2 -->

TASK: Give me 10 request bodies to test POST /api/jobs, as a table:
      3 valid, and 7 broken (missing title, empty body, salary as text,
      skills as a string, very long title, etc.). Tell me what response I should expect.
