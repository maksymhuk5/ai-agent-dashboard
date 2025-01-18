import { Opportunity, OpportunityStatus } from "./type";

// Garbage agent data for dialer testing purposes
export const agents = [
    {
        id: 1,
        name: "Sarah Johnson",
        avatar: "/images/agents/agent-female-1.jpg",
        language: "Spanish",
        phone: "+1 (212) 555-8901",
        type: "Sales",
        totalCallTime: 156,
        completedLeads: 45,
        incomingCalls: 78,
        outgoingCalls: 92
    },
    {
        id: 2,
        name: "Michael Chen",
        avatar: "/images/agents/agent-male-2.jpg",
        language: "Mandarin",
        phone: "+1 (415) 555-3456",
        type: "Customer Service",
        totalCallTime: 142,
        completedLeads: 38,
        incomingCalls: 65,
        outgoingCalls: 85
    },
    {
        id: 3,
        name: "Emma Wilson",
        avatar: "/images/agents/agent-female-2.jpg",
        language: "French",
        phone: "+1 (305) 555-7890",
        type: "Secretary",
        totalCallTime: 168,
        completedLeads: 52,
        incomingCalls: 89,
        outgoingCalls: 104
    },
    {
        id: 4,
        name: "James Miller",
        avatar: "/images/agents/agent-male-1.jpg",
        language: "German",
        phone: "+1 (617) 555-2345",
        type: "Feedback Collection",
        totalCallTime: 149,
        completedLeads: 41,
        incomingCalls: 72,
        outgoingCalls: 88
    },
    ]


export const leads = Array.from({ length: 40 }, (_, i) => {
    const statuses = [
        "Marketing Qualified Lead (MQL)",
        "Sales Qualified Lead (SQL)",
        "Product Qualified Lead (PQL)",
        "Service Qualified Lead",
        "Cold Lead",
        "Warm Lead",
        "Hot Lead",
        "Referral Lead",
        "Inbound Lead",
        "Outbound Lead",
        "Churned Lead"
    ] as const;

    const groupIds = [
        "sales-2023",
        "real-estate",
        "support-tickets",
        "event-registrants",
        "newsletter",
        "referral-program",
        "website-demo"
    ];

    const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;

    // Generate realistic looking phone numbers for different regions
    const areaCode = Math.floor(Math.random() * 800) + 200; // 200-999
    const prefix = Math.floor(Math.random() * 900) + 100; // 100-999
    const lineNum = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
    const phone = `+1 (${areaCode}) ${prefix}-${lineNum}`;

    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}@example.com`;

    const createdAt = new Date(Date.now() - Math.random() * 31536000000).toISOString();

    return {
        id: (i + 1).toString(),
        name,
        phone,
        email,
        groupId: groupIds[Math.floor(Math.random() * groupIds.length)],
        metadata: {
            status: statuses[Math.floor(Math.random() * statuses.length)],
            lastContact: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
            source: ["Website", "Referral", "Trade Show", "Cold Call", "Social Media"][Math.floor(Math.random() * 5)],
            priority: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)]
        },
        createdAt
    };
})

export const calls = Array.from({ length: 30 }, (_, i) => {
    const callTypes = ["Inbound", "Outbound", "Internal"];
    const results = ["Success", "Failed", "No Answer", "Busy", "Voicemail"];
    const statuses = ["Completed", "Missed", "Abandoned", "Voicemail", "Busy", "No Answer"];
    
    // Generate time between Nov 15-20, 2024
    const startDate = new Date('2024-11-15').getTime();
    const endDate = new Date('2024-11-20').getTime();
    const randomTime = new Date(startDate + Math.random() * (endDate - startDate));
    
    const callType = callTypes[Math.floor(Math.random() * callTypes.length)];
    const duration = Math.floor(Math.random() * 300) + 120; // 120-420 seconds
    const cost = Math.floor(duration * 0.2); // Roughly cost based on duration
    
    const result = results[Math.floor(Math.random() * results.length)];
    const status = result === "Success" ? "Completed" : 
                  result === "Voicemail" ? "Voicemail" :
                  result === "Busy" ? "Busy" :
                  result === "No Answer" ? "No Answer" : "Missed";

    // Generate phone numbers
    const areaCode = Math.floor(Math.random() * 800) + 200;
    const prefix = Math.floor(Math.random() * 900) + 100;
    const lineNum = Math.floor(Math.random() * 9000) + 1000;
    const from = `+1${areaCode}${prefix}${lineNum}`;
    const to = `+1${Math.floor(Math.random() * 800) + 200}${Math.floor(Math.random() * 900) + 100}${Math.floor(Math.random() * 9000) + 1000}`;

    const agentIndex = i % 3;
    const leadIndex = i % leads.length;

    const transcriptions = [
        "Discussion about pricing options...",
        "Walked through initial setup process...",
        "Detailed discussion about advanced features...",
        "Team updates and project planning...",
        "Reviewed renewal terms and options...",
        "No transcription available"
    ];

    const notes = [
        "Sales follow-up",
        "New customer onboarding",
        "Feature consultation",
        "Weekly team sync",
        "Contract renewal discussion",
        "Technical support call"
    ];

    return {
        id: (i + 1).toString(),
        time: randomTime.toISOString(),
        duration,
        callType,
        cost,
        agent: agents[agentIndex],
        lead: leads[leadIndex],
        from,
        to,
        callResult: result,
        callStatus: status,
        callNotes: notes[Math.floor(Math.random() * notes.length)],
        transcription: status === "Completed" ? 
            transcriptions[Math.floor(Math.random() * (transcriptions.length - 1))] : 
            transcriptions[transcriptions.length - 1]
    };
});

export const opportunities: Opportunity[] = Array.from({ length: 30 }, (_, i) => {
    const firstNames = ["Harald", "Thomas", "Michael", "Stefan", "Andreas", "Peter", "Klaus", "Wolfgang", "Markus", "Christian"];
    const lastNames = ["Neubauer", "Schmidt", "Müller", "Weber", "Wagner", "Fischer", "Meyer", "Schulz", "Becker", "Hoffmann"];
    const streets = ["Weinbergstr.", "Hauptstr.", "Kirchstr.", "Schulstr.", "Gartenstr.", "Bahnhofstr.", "Bergstr.", "Waldstr.", "Ringstr.", "Parkstr."];
    const cities = ["Wilhermsdorf", "Nürnberg", "München", "Stuttgart", "Frankfurt", "Hamburg", "Berlin", "Köln", "Dresden", "Leipzig"];
    const types = ["Flachdach", "Terrassendach", "Spitzdach"];
    const statuses: OpportunityStatus[] = ["New", "Contacted", "In Progress", "Cancelled", "Completed"];

    const randomDate = () => {
        const start = new Date(2024, 0, 1);
        const end = new Date(2025, 11, 31);
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    const offerDate = randomDate();
    const updateDate = new Date(offerDate.getTime() + Math.random() * 86400000); // Add up to 1 day

    return {
        id: (781228 + i).toString(),
        first_name: firstNames[Math.floor(Math.random() * firstNames.length)],
        last_name: lastNames[Math.floor(Math.random() * lastNames.length)],
        address: {
            street: `${streets[Math.floor(Math.random() * streets.length)]}${Math.floor(Math.random() * 100) + 1}`,
            city: `${Math.floor(Math.random() * 99999).toString().padStart(5, '0')} ${cities[Math.floor(Math.random() * cities.length)]}`,
            country: "Deutschland"
        },
        phone_number: `0049-${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
        coordinates: {
            lat: 47 + Math.random() * 8,
            lng: 5 + Math.random() * 10
        },
        email: `user${i + 1}@${['gmail.com', 't-online.de', 'yahoo.de', 'web.de'][Math.floor(Math.random() * 4)]}`,
        cp_type: types[Math.floor(Math.random() * types.length)],
        offer_from: offerDate.toISOString().split('T')[0],
        offer_update: updateDate.toISOString().replace('T', ' ').split('.')[0],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        created_at: offerDate.toISOString().split('T')[0],
        updated_at: updateDate.toISOString().replace('T', ' ').split('.')[0]
    };
});