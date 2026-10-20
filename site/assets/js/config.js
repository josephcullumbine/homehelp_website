/*
 * Site configuration: the one place to change business details and shared content.
 *
 * Any value written in [SQUARE BRACKETS] is a placeholder. While `showPlaceholders`
 * is true they are highlighted on the page so they are easy to spot. Every one must
 * be filled in before the site goes live (see TODO.md).
 */
window.SITE = {
  // Business name is not final. Changing it here updates the header, footer,
  // page titles, structured data and every [data-site="name"] on the site.
  name: "Help at Home",
  tagline: "Practical help at home in Norwich, from people you can trust.",

  phone: "07795 200816",           // e.g. "01603 123456"
  email: "cullumbine@hotmail.com",           // e.g. "hello@example.co.uk"
  area: "Norwich and surrounding areas", // [confirm] city only, or Taverham, Sprowston, Hellesdon, New Costessey and nearby villages?
  hours: "[OPENING HOURS]",   // e.g. "Monday to Friday, 9am to 5pm"
  replyTime: "within two working days", // matches the HubSpot enquiry form
  url: "https://[DOMAIN]",    // final domain, no trailing slash
  locality: "Norwich",
  region: "Norfolk",

  // Highlight [PLACEHOLDERS] on the page. Set to false only once none are left.
  showPlaceholders: true,

  /*
   * Enquiry form delivery. The site has no backend, so choose one:
   *   "formspree": set `endpoint` to your Formspree form URL (https://formspree.io/f/xxxx)
   *   "netlify":   only if hosting on Netlify; uses Netlify Forms, no endpoint needed
   *   "hubspot":   sends to the owner's HubSpot form (set below). Switch to this once the
   *                HubSpot form is published; while it is a draft, submissions are refused.
   *   "mailto":    opens the visitor's email app addressed to `email` above (fallback)
   */
  form: {
    provider: "hubspot",
    endpoint: "",
    hubspot: {
      portalId: "146428738",
      formId: "edcbf6e8-a147-498f-8ceb-0e9adb6b860b",
      region: "eu1",
      // HubSpot stores two options under the wrong internal values. Until they're
      // fixed in HubSpot, send what HubSpot expects. Delete this once fixed there.
      optionValues: {
        "Regular company": "true",
        "Regular check-ins - phone call": "false"
      }
    }
  },

  /*
   * Task checkboxes on the enquiry form. These mirror the owner's HubSpot form exactly
   * (`field` is the HubSpot property name), so they can be sent straight to HubSpot.
   */
  enquiryTasks: [
    { title: "Around the house", field: "homehelp_tasks_required",
      options: ["Cleaning", "Laundry", "Tidying", "Simple meal preparation", "De-cluttering"] },
    { title: "Company and check-ins", field: "companionship_visits_and_checkins",
      options: ["Regular company", "Regular check-ins - visit", "Regular check-ins - phone call"] },
    { title: "Shopping and errands", field: "shopping_and_errands__tasks_required",
      options: ["Go to the shops", "Create an on-line order", "Help with post"] }, // "Collect prescriptions" left out: see TODO.md
    { title: "Admin and paperwork", field: "admin_and_paperwork__tasks_required",
      options: ["Completing forms", "Helping with bills and invoices", "Managing calendar", "Meter readings"] },
    { title: "Gardening", field: "gardening__tasks_required",
      options: ["Mowing lawn(s)", "Trimming hedge(s)", "Maintaining borders", "Garden clearance"] },
    { title: "Decorating", field: "decorating__tasks_required",
      options: ["Indoor - painting wall(s)", "Indoor - painting woodwork", "Wallpapering", "Outdoor - painting wall(s)", "Outdoor - painting wood"] },
    { title: "Technology", field: "technology_support__tasks_required",
      options: ["Setting up or using tablets or phones", "Help with setting up or using TVs and remotes", "Help setting up or using assistive technology"] }
  ],

  /*
   * Trust & safety. Nothing here is published until it is confirmed.
   * `enabled` shows the page in the navigation; each item also needs `confirmed: true`.
   * Add ?preview=trust to the trust page address to see every item with its status.
   */
  trust: {
    enabled: false,
    items: [
      { id: "dbs", confirmed: false, title: "Background checked", text: "Every helper has a current basic DBS check, and you can see the certificate." },
      { id: "badges", confirmed: false, title: "Photo ID badges", text: "Helpers wear a photo ID badge, so you always know who is at the door." },
      { id: "insurance", confirmed: false, title: "Insured", text: "We are insured for work in your home (public liability)." },
      { id: "money", confirmed: true, title: "Never your money", text: "We never handle bank cards, PINs or passwords." },
      { id: "keys", confirmed: false, title: "Keys and key safes", text: "[KEY AND KEY-SAFE POLICY]" },
      { id: "training", confirmed: false, title: "Trained", text: "Helpers are trained in first aid, safeguarding and dementia awareness." },
      { id: "complaints", confirmed: false, title: "If something isn't right", text: "[COMPLAINTS ROUTE]" }
    ]
  },

  // Services: single source of truth. `confirm: true` marks services the owner still
  // needs to confirm (newer additions on the logo sheet).
  serviceGroups: [
    {
      id: "company",
      icon: "heart-hand",
      title: "Company and check-ins",
      summary: "A friendly face, regular visits or calls, and someone there when it matters.",
      services: [
        { name: "Companionship", text: "A friendly face and a chat over a cuppa, regular visits, or an outing." },
        { name: "Check-ins", text: "Regular visits or phone calls to see all is well, with a quick update to family if you wish." },
        { name: "Waiting in", text: "We wait in for deliveries, tradespeople or engineers so you don't have to." },
        { name: "Home from hospital", text: "A settled home to come back to: heating on, fridge stocked, bed made, and a helping hand in the first days." }
      ]
    },
    {
      id: "house",
      icon: "house-hand",
      title: "Around the house",
      summary: "The housework, the garden, decorating and the small jobs that keep a home running.",
      services: [
        { name: "Cleaning and tidying", text: "Light housework, tidying and de-cluttering, keeping the home fresh and safe." },
        { name: "Laundry, ironing and beds", text: "Washing, ironing and changing the bed." },
        { name: "Meal preparation", text: "Simple, home-cooked meals and tidying the kitchen after." },
        { name: "Decorating and small jobs", text: "Painting walls and woodwork indoors and out, wallpapering, and minor repairs." },
        { name: "Gardening", text: "Mowing lawns, trimming hedges, looking after borders, and garden clearance." }
      ]
    },
    {
      id: "errands",
      icon: "bag-hand",
      title: "Errands and admin",
      summary: "Shopping, post, paperwork and the jobs on the to-do list.",
      services: [
        { name: "Shopping and errands", text: "Going to the shops for you, or setting up an online order, plus help with the post." },
        { name: "Collections and drop-offs", text: "Parcels, returns, and items to and from places.", confirm: true },
        { name: "Admin and paperwork", text: "Filling in forms, sorting bills and invoices, keeping the calendar, and meter readings. We never handle banking.", strong: "We never handle banking." },
        { name: "Pet care", text: "Dog walking and pet care while you can't.", confirm: true }
      ]
    },
    {
      id: "tech",
      icon: "tablet-hand",
      title: "Technology",
      summary: "Tablets, phones, TVs and remotes, set up and explained patiently.",
      services: [
        { name: "Technology help", text: "Setting up and using tablets, phones, TVs and remotes." },
        { name: "Assistive technology", text: "Installing and supporting assistive tech around the home." }
      ]
    }
  ],

  // What we don't do. Reused on the Services page, the home page and the footer.
  dontDo: [
    "Personal care (washing, bathing, dressing, toileting)",
    "Lifting or moving people",
    "Medical care",
    "Collecting or giving out medication",
    "Gas, electrical or plumbing work",
    "Financial matters or banking",
    "Legal matters",
    "Driving or lifts"
  ],
  dontDoShort: [
    "Personal care",
    "Lifting or moving people",
    "Medical care or medication",
    "Gas, electrics or plumbing",
    "Money, banking or legal matters",
    "Driving or lifts"
  ]
};
