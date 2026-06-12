### Confusion choosing database

Look the problem is that a document(collection of pages) could grow very large and i am using PostgreSQL for this project and i'll have to send complete Json documents between the client and the server each time user makes changes to the document. even if they add a single character, the entire document needs to be sent.

but but , i did the calculation and found out that a typical document consisting of let's say 100 pages and 2,000 words would be around of 12 KBs that is not a lot. I can load the entire document into memory and send it as a single request, and make changes to it on the client side before sending it back to the server.

and MongoDB's flexible schema sounds very tempting to me right now but i'll bear this hard stuff of building everything around PostgreSQL's JsonB bcs i know later on i have to implement multiuser editing and i'll move to CRDT/OT where i'll need to implement conflict resolution and operational transformation.PG's acid trasaction would handle that perfectly

and also i think it can be shipped faster with postgres and prisma.


### Progress before 9th June
Look this time has really gone into iterating a lot with desing choices, and working on editor, the thing is i was thinking to get it perfect in the first attempt , as an engineer i should know that its better to ship a good product instead of making it better for eternity.
