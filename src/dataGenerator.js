// Tunisian Criminal Dataset Generator

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randFloat = (min, max, dec = 0) => parseFloat((Math.random() * (max - min) + min).toFixed(dec));

// ─── Names ───────────────────────────────────────────────────────────────────
const maleFirstNames = [
  'Mohamed', 'Ahmed', 'Ali', 'Omar', 'Yassine', 'Bilel', 'Hamza', 'Anis',
  'Sami', 'Khaled', 'Nidhal', 'Houssem', 'Aymen', 'Rami', 'Wael', 'Fares',
  'Malek', 'Seifeddine', 'Amine', 'Skander', 'Bassem', 'Lotfi', 'Tarek',
  'Walid', 'Nizar', 'Mehdi', 'Karim', 'Hedi', 'Slim', 'Zied',
];
const femaleFirstNames = [
  'Fatma', 'Amira', 'Sonia', 'Ines', 'Rania', 'Mariem', 'Nour', 'Salma',
  'Emna', 'Olfa', 'Hana', 'Dorra', 'Rim', 'Lina', 'Asma', 'Chaima',
  'Wafa', 'Samira', 'Najet', 'Ahlem', 'Manel', 'Sabrine', 'Imen', 'Hela',
];
const lastNames = [
  'Ben Salah', 'Trabelsi', 'Chaabane', 'Hamdi', 'Mansour', 'Bouazizi',
  'Khalfallah', 'Mahjoub', 'Ferchichi', 'Khelifi', 'Gharbi', 'Jebali',
  'Saidi', 'Tlili', 'Amri', 'Dridi', 'Rekik', 'Belhaj', 'Oueslati',
  'Meddeb', 'Jelassi', 'Nasr', 'Ayari', 'Turki', 'Chouchane', 'Gargouri',
  'Elloumi', 'Haddad', 'Bouzid', 'Zaidi',
];

// ─── Geography ───────────────────────────────────────────────────────────────
const tunisianCities = [
  'Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte', 'Gabès', 'Ariana',
  'Gafsa', 'Monastir', 'Ben Arous', 'Kasserine', 'Medenine', 'Nabeul',
  'Tataouine', 'Béja', 'Jendouba', 'El Kef', 'Mahdia', 'Sidi Bouzid',
  'Tozeur', 'Siliana', 'Zaghouan', 'Manouba',
];

const neighborhoodsByCity = {
  Tunis: ['Bab Souika', 'La Marsa', 'Ettadhamen', 'Ezzouhour', 'Sijoumi', 'Hay Hlel', 'El Ouardia', 'Cité Sportive'],
  Sfax: ['Sfax Médina', 'Hay Riadh', 'Route Tunis', 'Cité El Habib', 'Thyna', 'Sakiet Ezzit'],
  Sousse: ['Médina Sousse', 'Khzema', 'Sahloul', 'Hay Salam', 'Hammam Sousse'],
  default: ['Hay Nour', 'Hay Ennour', 'Médina', 'Centre Ville', 'Hay Essalam', 'Cité Nouvelle'],
};

const neighborhoodQualities = ['Très pauvre', 'Pauvre', 'Moyen', 'Bon', 'Résidentiel'];
const countryOfOrigin = ['Tunisie', 'Libye', 'Algérie', 'Maroc', 'Mauritanie'];

// ─── Academic ────────────────────────────────────────────────────────────────
const academicLevels = ['Analphabète', 'Primaire', 'Collège', 'Lycée', 'Bac', 'Bac+2', 'Licence', 'Master', 'Doctorat'];
const fieldsOfStudy = ['Sans', 'Sciences', 'Lettres', 'Droit', 'Informatique', 'Médecine', 'Commerce', 'Technique', 'Agriculture'];
const primarySchoolTypes = ['Public', 'Privé', 'Coranique', 'Non scolarisé'];
const parentalEducation = ['Analphabète', 'Primaire', 'Secondaire', 'Universitaire'];
const legalKnowledgeLevels = ['Aucune', 'Basique', 'Moyenne', 'Avancée'];

// ─── Finance ─────────────────────────────────────────────────────────────────
const financialSituations = ['Très précaire', 'Précaire', 'Modeste', 'Moyenne', 'Aisée'];
const debtLevels = ['Aucune', 'Faible', 'Modérée', 'Élevée', 'Très élevée'];
const incomeSources = ['Emploi légal', 'Commerce informel', 'Aide familiale', 'Allocations', 'Activité illégale', 'Sans revenu'];
const propertyOwnerships = ['Locataire', 'Propriétaire', 'Sans domicile fixe', 'Hébergé par famille'];

// ─── Family ──────────────────────────────────────────────────────────────────
const familySituations = ['Célibataire', 'Marié(e)', 'Divorcé(e)', 'Veuf/Veuve'];
const parentalMaritalStatuses = ['Mariés', 'Divorcés', 'Séparés', 'Veuf/Veuve', 'Décédés'];

// ─── Employment ──────────────────────────────────────────────────────────────
const employmentStatuses = ['Employé', 'Chômeur', 'Travailleur informel', 'Étudiant', 'Retraité', 'Sans emploi'];
const jobs = {
  Employé: ['Ouvrier', 'Agent de sécurité', 'Mécanicien', 'Chauffeur', 'Vendeur', 'Coiffeur', 'Plombier', 'Électricien'],
  Chômeur: ['Sans emploi'],
  'Travailleur informel': ['Marchand ambulant', 'Aide de chantier', 'Collecteur de déchets', 'Revendeur'],
  Étudiant: ['Étudiant'],
  Retraité: ['Retraité'],
  'Sans emploi': ['Aucun'],
};
const commuteMethod = ['À pied', 'Vélo', 'Moto', 'Voiture personnelle', 'Transport en commun', 'Taxi'];

// ─── Health ──────────────────────────────────────────────────────────────────
const psychologicalConditions = ['Trouble de la personnalité antisociale', 'Schizophrénie', 'Trouble bipolaire', 'Dépression sévère', 'TDAH', 'Trouble anxieux', 'Trouble impulsif'];
const mentalHealthTreatments = ['Aucun', 'Médicaments', 'Thérapie', 'Hospitalisation', 'Suivi psychiatrique'];
const physicalHealthStatuses = ['Bonne santé', 'Santé fragile', 'Malade chronique', 'Handicapé'];
const chronicDiseases = ['Aucune', 'Diabète', 'Hypertension', 'Épilepsie', 'Insuffisance rénale', 'Hépatite C'];
const addictionTypes = ['Aucune', 'Alcool', 'Cannabis', 'Tramadol', 'Héroïne', 'Cocaïne', 'Tabac', 'Polytoxicomanie'];

// ─── Crime ───────────────────────────────────────────────────────────────────
const crimeTypes = [
  'Vol simple', 'Vol avec violence', 'Cambriolage', 'Trafic de drogue', 'Homicide',
  'Agression physique', 'Viol', 'Escroquerie', 'Blanchiment d\'argent', 'Terrorisme',
  'Trafic d\'armes', 'Enlèvement', 'Fraude', 'Cybercriminalité', 'Recel',
  'Braconnage', 'Violence conjugale', 'Menaces', 'Destruction de biens', 'Contrebande', 'Meurtre en série',
];
const theftCrimeTypes = ['Vol simple', 'Vol avec violence', 'Cambriolage'];
const violentCrimeTypes = ['Homicide', 'Agression physique', 'Viol', 'Meurtre en série'];
const otherCrimeTypes = crimeTypes.filter(
  (crime) => !theftCrimeTypes.includes(crime) && !violentCrimeTypes.includes(crime)
);
const criminalRecords = ['Aucun', 'Un antécédent', 'Récidiviste', 'Multi-récidiviste'];
const weapons = ['Aucune', 'Couteau', 'Arme à feu', 'Bâton', 'Pierre', 'Explosif', 'Acide'];
const crimeTimesOfDay = ['Aube (04h-07h)', 'Matin (07h-12h)', 'Après-midi (12h-17h)', 'Soir (17h-21h)', 'Nuit (21h-04h)'];
const crimeLocationTypes = ['Domicile', 'Rue', 'Commerce', 'École', 'Parking', 'Zone industrielle', 'Forêt', 'Plage', 'Marché'];
const investigationBehaviors = ['Coopératif', 'Non coopératif', 'Menteur', 'Silencieux', 'Agité', 'Agressif'];
const arrestMethods = ['En flagrant délit', 'Dénonciation', 'Caméra de surveillance', 'Enquête', 'Poursuite', 'Barrage routier'];
const legalArticleRefs = ['Art. 214 CP', 'Art. 296 CP', 'Art. 311 CP', 'Art. 89 CP', 'Loi 92-52', 'Art. 218 CP', 'Art. 231 CP', 'Loi 2003-75'];
const currentLegalStatuses = ['En garde à vue', 'En détention provisoire', 'Jugé condamné', 'Acquitté', 'En liberté sous caution', 'En fuite'];
const victimRelationships = ['Inconnu', 'Voisin', 'Conjoint', 'Parent', 'Ami', 'Collègue', 'Client', 'Employeur'];

// ─── CIN & Phone ─────────────────────────────────────────────────────────────
const generateCIN = () => {
  const digits = Array.from({ length: 8 }, () => randInt(0, 9)).join('');
  return digits;
};

const generatePhone = () => {
  const prefixes = ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '50', '51', '52', '53', '54', '55', '56', '57', '58', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'];
  const prefix = rand(prefixes);
  const rest = Array.from({ length: 6 }, () => randInt(0, 9)).join('');
  return `+216 ${prefix} ${rest.slice(0, 3)} ${rest.slice(3)}`;
};

// ─── Main Generator ──────────────────────────────────────────────────────────
export const generateRecord = (id, hasCommittedCrime = null) => {
  if (hasCommittedCrime === null) {
    hasCommittedCrime = Math.random() < 0.5;
  }

  const gender = rand(['Homme', 'Femme']);
  const firstName = gender === 'Homme' ? rand(maleFirstNames) : rand(femaleFirstNames);
  const lastName = rand(lastNames);
  const age = randInt(15, 65);
  const city = rand(tunisianCities);
  const neighborhoods = neighborhoodsByCity[city] || neighborhoodsByCity.default;
  const neighborhood = rand(neighborhoods);
  const neighborhoodQuality = rand(neighborhoodQualities);
  const neighborhoodSafetyRating = randInt(1, 10);
  const frequentNeighborhoodVisited = rand(neighborhoods);
  const distanceFromHomeKm = randFloat(0.5, 40, 1);

  let crime = 'Aucun';
  let financialSituation = rand(financialSituations);
  let incomeSource = rand(incomeSources);
  let employmentStatus = rand(employmentStatuses);
  let hasPsychologicalProblem = Math.random() < 0.45;
  let psychologicalCondition = 'Aucun';
  let parentalMaritalStatus = rand(parentalMaritalStatuses);
  let crimeLocationType = 'N/A';
  let weaponUsed = 'Aucune';
  let investigationBehavior = 'N/A';
  let numberOfAccomplices = 0;
  let victimRelationship = 'Aucun';
  let addictionType = rand(addictionTypes);

  if (hasCommittedCrime) {
    const crimeTypeChance = Math.random();
    if (crimeTypeChance < 0.45) {
      // Vol (Strong correlation with poverty)
      crime = rand(theftCrimeTypes);
      financialSituation = rand(['Très précaire', 'Précaire']);
      incomeSource = rand(['Sans revenu', 'Commerce informel', 'Allocations']);
      employmentStatus = rand(['Chômeur', 'Travailleur informel', 'Sans emploi']);
      crimeLocationType = rand(['Rue', 'Commerce', 'Marché', 'Parking']);
      weaponUsed = crime === 'Vol simple' ? 'Aucune' : rand(['Couteau', 'Bâton', 'Pierre']);
      investigationBehavior = rand(['Non coopératif', 'Menteur', 'Silencieux']);
      numberOfAccomplices = randInt(0, 3);
    } else if (crimeTypeChance < 0.8) {
      // Crimes violents / Série (Strong correlation with psychological issues and family separation)
      crime = rand(violentCrimeTypes);
      hasPsychologicalProblem = true;
      psychologicalCondition = rand(['Trouble de la personnalité antisociale', 'Schizophrénie', 'Trouble impulsif']);
      parentalMaritalStatus = rand(['Divorcés', 'Séparés']);
      crimeLocationType = rand(['Domicile', 'Rue', 'Forêt', 'Zone industrielle']);
      weaponUsed = rand(['Couteau', 'Arme à feu', 'Acide']);
      investigationBehavior = rand(['Agressif', 'Agité', 'Silencieux']);
      numberOfAccomplices = crime === 'Meurtre en série' ? 0 : randInt(0, 2);
      victimRelationship = rand(['Inconnu', 'Voisin', 'Conjoint']);
      addictionType = rand(['Aucune', 'Alcool', 'Polytoxicomanie']);
    } else {
      // Autre crimes
      crime = rand(otherCrimeTypes);
      crimeLocationType = rand(crimeLocationTypes);
      weaponUsed = rand(weapons);
      investigationBehavior = rand(investigationBehaviors);
      numberOfAccomplices = randInt(0, 5);
      victimRelationship = rand(victimRelationships);
    }
  }

  const academicLevel = rand(academicLevels);
  const fieldOfStudy = ['Bac', 'Bac+2', 'Licence', 'Master', 'Doctorat'].includes(academicLevel) ? rand(fieldsOfStudy.filter(f => f !== 'Sans')) : 'Sans';

  const jobOptions = jobs[employmentStatus] || ['Aucun'];
  const job = rand(jobOptions);

  const mentalHealthTreatment = hasPsychologicalProblem ? rand(mentalHealthTreatments) : 'Aucun';

  const monthlyIncome = incomeSource === 'Sans revenu' ? 0 : randInt(300, 4000);
  const monthlyExpenses = randInt(200, Math.max(monthlyIncome + 200, 800));

  const numArrests = hasCommittedCrime ? randInt(1, 8) : 0;
  const criminalRecord = numArrests === 0 ? 'Aucun' : numArrests === 1 ? 'Un antécédent' : numArrests <= 3 ? 'Récidiviste' : 'Multi-récidiviste';

  const familySituation = rand(familySituations);
  const numChildren = familySituation === 'Célibataire' ? randInt(0, 2) : randInt(0, 6);

  const currentLegalStatus = hasCommittedCrime ? rand(currentLegalStatuses) : 'En règle';
  const preTrialDays = ['En garde à vue', 'En détention provisoire'].includes(currentLegalStatus) ? randInt(1, 365) : 0;
  const lastSentenceDuration = numArrests > 0 ? `${randInt(1, 15)} ans` : 'Aucune';

  const origin = 'Tunisie';

  return {
    id,
    first_name: firstName,
    last_name: lastName,
    gender,
    age,
    origin,
    cin_card: generateCIN(),
    phone_number: generatePhone(),
    country: origin,
    city,
    neighborhood,
    neighborhood_quality: neighborhoodQuality,
    neighborhood_safety_rating: neighborhoodSafetyRating,
    frequent_neighborhood_visited: frequentNeighborhoodVisited,
    distance_from_home_km: distanceFromHomeKm,
    academic_level: academicLevel,
    field_of_study: fieldOfStudy,
    primary_school_type: rand(primarySchoolTypes),
    parental_education: rand(parentalEducation),
    legal_knowledge_level: rand(legalKnowledgeLevels),
    financial_situation: financialSituation,
    monthly_income_tnd: monthlyIncome,
    monthly_expenses_tnd: monthlyExpenses,
    debt_level: rand(debtLevels),
    income_source: incomeSource,
    property_ownership: rand(propertyOwnerships),
    family_situation: familySituation,
    number_of_children: numChildren,
    number_of_siblings: randInt(0, 8),
    parental_marital_status: parentalMaritalStatus,
    family_criminal_history: rand(['Oui', 'Non', 'Non']),
    family_psychological_issues: rand(['Oui', 'Non', 'Non']),
    friend_in_jail: rand(['Oui', 'Non']),
    employment_status: employmentStatus,
    job,
    daily_commute_method: rand(commuteMethod),
    has_psychological_problem: hasPsychologicalProblem ? 'Oui' : 'Non',
    psychological_condition: psychologicalCondition,
    mental_health_treatment: mentalHealthTreatment,
    physical_health_status: rand(physicalHealthStatuses),
    chronic_diseases: rand(chronicDiseases),
    addiction_type: addictionType,
    crime: crime,
    criminal_record: criminalRecord,
    number_of_previous_arrests: numArrests,
    juvenile_record: age < 30 && numArrests > 0 ? rand(['Oui', 'Non']) : 'Non',
    weapon_used: weaponUsed,
    crime_time_of_day: hasCommittedCrime ? rand(crimeTimesOfDay) : 'N/A',
    crime_location_type: crimeLocationType,
    number_of_accomplices: numberOfAccomplices,
    investigation_behavior: investigationBehavior,
    arrest_method: hasCommittedCrime ? rand(arrestMethods) : 'N/A',
    legal_article_reference: hasCommittedCrime ? rand(legalArticleRefs) : 'N/A',
    current_legal_status: currentLegalStatus,
    pre_trial_detention_days: preTrialDays,
    last_sentence_duration: lastSentenceDuration,
    victim_relationship: victimRelationship,
  };
};

export const generateDataset = (count) => {
  const crimeCount = Math.floor(count / 2);
  const nonCrimeCount = count - crimeCount;
  const flags = [
    ...Array.from({ length: crimeCount }, () => true),
    ...Array.from({ length: nonCrimeCount }, () => false),
  ];

  // Shuffle to avoid ordered blocks of criminal/non-criminal records.
  for (let i = flags.length - 1; i > 0; i -= 1) {
    const j = randInt(0, i);
    [flags[i], flags[j]] = [flags[j], flags[i]];
  }

  return flags.map((hasCrime, i) => generateRecord(i + 1, hasCrime));
};

export const toCSV = (data) => {
  if (!data.length) return '';
  const headers = Object.keys(data[0]);
  const rows = data.map(row =>
    headers.map(h => {
      const val = String(row[h] ?? '');
      return val.includes(',') || val.includes('"') || val.includes('\n')
        ? `"${val.replace(/"/g, '""')}"`
        : val;
    }).join(',')
  );
  return [headers.join(','), ...rows].join('\n');
};

export const toJSON = (data) => JSON.stringify(data, null, 2);
