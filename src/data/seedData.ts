import { Subject } from '../types';

export const seedSubjects: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    description: 'Algebra, Calculus, Geometry and more',
    icon: '📐',
    color: 'blue',
    quizzes: [
      {
        id: 'math-q1',
        title: 'Algebra Basics',
        questions: [
          {
            id: 'math-q1-1',
            text: 'What is the value of x in the equation 2x + 6 = 14?',
            choices: [
              { id: 'a', text: 'x = 2', isCorrect: false },
              { id: 'b', text: 'x = 4', isCorrect: true },
              { id: 'c', text: 'x = 6', isCorrect: false },
              { id: 'd', text: 'x = 8', isCorrect: false },
            ],
          },
          {
            id: 'math-q1-2',
            text: 'Simplify: 3(x + 2) - 2x',
            choices: [
              { id: 'a', text: 'x + 6', isCorrect: true },
              { id: 'b', text: '5x + 6', isCorrect: false },
              { id: 'c', text: 'x + 2', isCorrect: false },
              { id: 'd', text: '3x + 6', isCorrect: false },
            ],
          },
          {
            id: 'math-q1-3',
            text: 'What is the slope of the line y = 3x - 7?',
            choices: [
              { id: 'a', text: '-7', isCorrect: false },
              { id: 'b', text: '3', isCorrect: true },
              { id: 'c', text: '7', isCorrect: false },
              { id: 'd', text: '-3', isCorrect: false },
            ],
          },
          {
            id: 'math-q1-4',
            text: 'If f(x) = x² + 1, what is f(3)?',
            choices: [
              { id: 'a', text: '7', isCorrect: false },
              { id: 'b', text: '9', isCorrect: false },
              { id: 'c', text: '10', isCorrect: true },
              { id: 'd', text: '12', isCorrect: false },
            ],
          },
          {
            id: 'math-q1-5',
            text: 'What is the solution set of |x - 3| = 5?',
            choices: [
              { id: 'a', text: '{-2, 8}', isCorrect: true },
              { id: 'b', text: '{2, 8}', isCorrect: false },
              { id: 'c', text: '{-2, -8}', isCorrect: false },
              { id: 'd', text: '{2, -8}', isCorrect: false },
            ],
          },
        ],
      },
      {
        id: 'math-q2',
        title: 'Geometry Fundamentals',
        questions: [
          {
            id: 'math-q2-1',
            text: 'What is the area of a circle with radius 5?',
            choices: [
              { id: 'a', text: '25π', isCorrect: true },
              { id: 'b', text: '10π', isCorrect: false },
              { id: 'c', text: '50π', isCorrect: false },
              { id: 'd', text: '15π', isCorrect: false },
            ],
          },
          {
            id: 'math-q2-2',
            text: 'The sum of angles in a triangle is:',
            choices: [
              { id: 'a', text: '90°', isCorrect: false },
              { id: 'b', text: '180°', isCorrect: true },
              { id: 'c', text: '270°', isCorrect: false },
              { id: 'd', text: '360°', isCorrect: false },
            ],
          },
          {
            id: 'math-q2-3',
            text: 'What is the Pythagorean theorem?',
            choices: [
              { id: 'a', text: 'a + b = c', isCorrect: false },
              { id: 'b', text: 'a² + b² = c²', isCorrect: true },
              { id: 'c', text: 'a² - b² = c²', isCorrect: false },
              { id: 'd', text: '2a + 2b = c', isCorrect: false },
            ],
          },
          {
            id: 'math-q2-4',
            text: 'How many sides does a hexagon have?',
            choices: [
              { id: 'a', text: '5', isCorrect: false },
              { id: 'b', text: '6', isCorrect: true },
              { id: 'c', text: '7', isCorrect: false },
              { id: 'd', text: '8', isCorrect: false },
            ],
          },
          {
            id: 'math-q2-5',
            text: 'What is the volume of a cube with side length 3?',
            choices: [
              { id: 'a', text: '9', isCorrect: false },
              { id: 'b', text: '18', isCorrect: false },
              { id: 'c', text: '27', isCorrect: true },
              { id: 'd', text: '81', isCorrect: false },
            ],
          },
        ],
      },
      {
        id: 'math-q3',
        title: 'Calculus Introduction',
        questions: [
          {
            id: 'math-q3-1',
            text: 'What is the derivative of x²?',
            choices: [
              { id: 'a', text: 'x', isCorrect: false },
              { id: 'b', text: '2x', isCorrect: true },
              { id: 'c', text: '2', isCorrect: false },
              { id: 'd', text: 'x²/2', isCorrect: false },
            ],
          },
          {
            id: 'math-q3-2',
            text: 'What is the integral of 2x dx?',
            choices: [
              { id: 'a', text: 'x² + C', isCorrect: true },
              { id: 'b', text: '2x² + C', isCorrect: false },
              { id: 'c', text: 'x + C', isCorrect: false },
              { id: 'd', text: '2 + C', isCorrect: false },
            ],
          },
          {
            id: 'math-q3-3',
            text: 'The derivative of sin(x) is:',
            choices: [
              { id: 'a', text: '-cos(x)', isCorrect: false },
              { id: 'b', text: 'cos(x)', isCorrect: true },
              { id: 'c', text: 'sin(x)', isCorrect: false },
              { id: 'd', text: '-sin(x)', isCorrect: false },
            ],
          },
          {
            id: 'math-q3-4',
            text: 'What is lim(x→0) sin(x)/x?',
            choices: [
              { id: 'a', text: '0', isCorrect: false },
              { id: 'b', text: '1', isCorrect: true },
              { id: 'c', text: '∞', isCorrect: false },
              { id: 'd', text: 'undefined', isCorrect: false },
            ],
          },
          {
            id: 'math-q3-5',
            text: 'The derivative of eˣ is:',
            choices: [
              { id: 'a', text: 'xeˣ⁻¹', isCorrect: false },
              { id: 'b', text: 'eˣ', isCorrect: true },
              { id: 'c', text: 'eˣ⁺¹', isCorrect: false },
              { id: 'd', text: 'ln(x)', isCorrect: false },
            ],
          },
        ],
      },
    ],
    riddles: [
      { id: 'math-r1', question: 'I am an odd number. Take away a letter and I become even. What number am I?', answer: 'Seven (remove the "s" and it becomes "even")' },
      { id: 'math-r2', question: 'What has roots that nobody sees, is taller than trees, up and up it goes, and yet never grows?', answer: 'A mountain' },
      { id: 'math-r3', question: 'If you have 3 apples and you take away 2, how many do you have?', answer: '2 - you took them!' },
    ],
    videos: [
      { id: 'math-v1', title: 'Introduction to Algebra', path: '/videos/math-algebra-intro.mp4', order: 1, duration: '15:30' },
      { id: 'math-v2', title: 'Solving Linear Equations', path: '/videos/math-linear-equations.mp4', order: 2, duration: '22:15' },
      { id: 'math-v3', title: 'Geometry Basics', path: '/videos/math-geometry-basics.mp4', order: 3, duration: '18:45' },
      { id: 'math-v4', title: 'Introduction to Calculus', path: '/videos/math-calculus-intro.mp4', order: 4, duration: '25:00' },
    ],
    materials: [
      { id: 'math-m1', title: 'Algebra Reference Sheet', path: '/materials/math-algebra-reference.pdf', subjectId: 'math', type: 'pdf' },
      { id: 'math-m2', title: 'Geometry Formulas', path: '/materials/math-geometry-formulas.pdf', subjectId: 'math', type: 'pdf' },
    ],
  },
  {
    id: 'physics',
    name: 'Physics',
    description: 'Mechanics, Thermodynamics, Electromagnetism',
    icon: '⚛️',
    color: 'purple',
    quizzes: [
      {
        id: 'phys-q1',
        title: 'Newton\'s Laws',
        questions: [
          {
            id: 'phys-q1-1',
            text: 'Newton\'s first law is also known as the law of:',
            choices: [
              { id: 'a', text: 'Acceleration', isCorrect: false },
              { id: 'b', text: 'Inertia', isCorrect: true },
              { id: 'c', text: 'Gravity', isCorrect: false },
              { id: 'd', text: 'Momentum', isCorrect: false },
            ],
          },
          {
            id: 'phys-q1-2',
            text: 'F = ma is Newton\'s:',
            choices: [
              { id: 'a', text: 'First law', isCorrect: false },
              { id: 'b', text: 'Second law', isCorrect: true },
              { id: 'c', text: 'Third law', isCorrect: false },
              { id: 'd', text: 'Law of gravitation', isCorrect: false },
            ],
          },
          {
            id: 'phys-q1-3',
            text: 'For every action, there is an equal and opposite:',
            choices: [
              { id: 'a', text: 'Force', isCorrect: false },
              { id: 'b', text: 'Reaction', isCorrect: true },
              { id: 'c', text: 'Velocity', isCorrect: false },
              { id: 'd', text: 'Acceleration', isCorrect: false },
            ],
          },
          {
            id: 'phys-q1-4',
            text: 'The unit of force is:',
            choices: [
              { id: 'a', text: 'Joule', isCorrect: false },
              { id: 'b', text: 'Watt', isCorrect: false },
              { id: 'c', text: 'Newton', isCorrect: true },
              { id: 'd', text: 'Pascal', isCorrect: false },
            ],
          },
          {
            id: 'phys-q1-5',
            text: 'An object at rest stays at rest unless acted upon by:',
            choices: [
              { id: 'a', text: 'Gravity', isCorrect: false },
              { id: 'b', text: 'Friction', isCorrect: false },
              { id: 'c', text: 'An external force', isCorrect: true },
              { id: 'd', text: 'Mass', isCorrect: false },
            ],
          },
        ],
      },
      {
        id: 'phys-q2',
        title: 'Energy & Work',
        questions: [
          {
            id: 'phys-q2-1',
            text: 'The SI unit of energy is:',
            choices: [
              { id: 'a', text: 'Newton', isCorrect: false },
              { id: 'b', text: 'Joule', isCorrect: true },
              { id: 'c', text: 'Watt', isCorrect: false },
              { id: 'd', text: 'Pascal', isCorrect: false },
            ],
          },
          {
            id: 'phys-q2-2',
            text: 'Kinetic energy formula is:',
            choices: [
              { id: 'a', text: 'KE = mgh', isCorrect: false },
              { id: 'b', text: 'KE = ½mv²', isCorrect: true },
              { id: 'c', text: 'KE = mv', isCorrect: false },
              { id: 'd', text: 'KE = Fd', isCorrect: false },
            ],
          },
          {
            id: 'phys-q2-3',
            text: 'Power is the rate of doing:',
            choices: [
              { id: 'a', text: 'Force', isCorrect: false },
              { id: 'b', text: 'Work', isCorrect: true },
              { id: 'c', text: 'Motion', isCorrect: false },
              { id: 'd', text: 'Acceleration', isCorrect: false },
            ],
          },
          {
            id: 'phys-q2-4',
            text: 'Conservation of energy states that energy cannot be:',
            choices: [
              { id: 'a', text: 'Transferred', isCorrect: false },
              { id: 'b', text: 'Created or destroyed', isCorrect: true },
              { id: 'c', text: 'Measured', isCorrect: false },
              { id: 'd', text: 'Stored', isCorrect: false },
            ],
          },
          {
            id: 'phys-q2-5',
            text: 'The unit of power is:',
            choices: [
              { id: 'a', text: 'Joule', isCorrect: false },
              { id: 'b', text: 'Newton', isCorrect: false },
              { id: 'c', text: 'Watt', isCorrect: true },
              { id: 'd', text: 'Ampere', isCorrect: false },
            ],
          },
        ],
      },
      {
        id: 'phys-q3',
        title: 'Waves & Sound',
        questions: [
          {
            id: 'phys-q3-1',
            text: 'Sound waves are:',
            choices: [
              { id: 'a', text: 'Transverse waves', isCorrect: false },
              { id: 'b', text: 'Longitudinal waves', isCorrect: true },
              { id: 'c', text: 'Electromagnetic waves', isCorrect: false },
              { id: 'd', text: 'Standing waves', isCorrect: false },
            ],
          },
          {
            id: 'phys-q3-2',
            text: 'The speed of sound in air is approximately:',
            choices: [
              { id: 'a', text: '343 m/s', isCorrect: true },
              { id: 'b', text: '3 × 10⁸ m/s', isCorrect: false },
              { id: 'c', text: '1500 m/s', isCorrect: false },
              { id: 'd', text: '100 m/s', isCorrect: false },
            ],
          },
          {
            id: 'phys-q3-3',
            text: 'Frequency is measured in:',
            choices: [
              { id: 'a', text: 'Meters', isCorrect: false },
              { id: 'b', text: 'Seconds', isCorrect: false },
              { id: 'c', text: 'Hertz', isCorrect: true },
              { id: 'd', text: 'Decibels', isCorrect: false },
            ],
          },
          {
            id: 'phys-q3-4',
            text: 'The Doppler effect explains:',
            choices: [
              { id: 'a', text: 'Why sound is loud', isCorrect: false },
              { id: 'b', text: 'Change in frequency due to relative motion', isCorrect: true },
              { id: 'c', text: 'Sound reflection', isCorrect: false },
              { id: 'd', text: 'Wave interference', isCorrect: false },
            ],
          },
          {
            id: 'phys-q3-5',
            text: 'Light travels fastest in:',
            choices: [
              { id: 'a', text: 'Water', isCorrect: false },
              { id: 'b', text: 'Glass', isCorrect: false },
              { id: 'c', text: 'Vacuum', isCorrect: true },
              { id: 'd', text: 'Air', isCorrect: false },
            ],
          },
        ],
      },
    ],
    riddles: [
      { id: 'phys-r1', question: 'I can fly without wings. I can cry without eyes. Wherever I go, darkness follows me. What am I?', answer: 'A cloud' },
      { id: 'phys-r2', question: 'I am always coming but never arrive. What am I?', answer: 'Tomorrow' },
      { id: 'phys-r3', question: 'The more you take, the more you leave behind. What am I?', answer: 'Footsteps' },
    ],
    videos: [
      { id: 'phys-v1', title: 'Introduction to Mechanics', path: '/videos/physics-mechanics-intro.mp4', order: 1, duration: '20:00' },
      { id: 'phys-v2', title: 'Newton\'s Laws Explained', path: '/videos/physics-newtons-laws.mp4', order: 2, duration: '18:30' },
      { id: 'phys-v3', title: 'Energy and Conservation', path: '/videos/physics-energy.mp4', order: 3, duration: '24:15' },
      { id: 'phys-v4', title: 'Waves and Oscillations', path: '/videos/physics-waves.mp4', order: 4, duration: '21:00' },
    ],
    materials: [
      { id: 'phys-m1', title: 'Physics Formula Sheet', path: '/materials/physics-formula-sheet.pdf', subjectId: 'physics', type: 'pdf' },
      { id: 'phys-m2', title: 'Lab Manual', path: '/materials/physics-lab-manual.pdf', subjectId: 'physics', type: 'pdf' },
    ],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Organic, Inorganic, Physical Chemistry',
    icon: '🧪',
    color: 'green',
    quizzes: [
      {
        id: 'chem-q1',
        title: 'Atomic Structure',
        questions: [
          {
            id: 'chem-q1-1',
            text: 'The atomic number of an element represents:',
            choices: [
              { id: 'a', text: 'Number of neutrons', isCorrect: false },
              { id: 'b', text: 'Number of protons', isCorrect: true },
              { id: 'c', text: 'Number of electrons', isCorrect: false },
              { id: 'd', text: 'Mass number', isCorrect: false },
            ],
          },
          {
            id: 'chem-q1-2',
            text: 'Electrons orbit the nucleus in:',
            choices: [
              { id: 'a', text: 'Random paths', isCorrect: false },
              { id: 'b', text: 'Energy levels/shells', isCorrect: true },
              { id: 'c', text: 'A single orbit', isCorrect: false },
              { id: 'd', text: 'The nucleus', isCorrect: false },
            ],
          },
          {
            id: 'chem-q1-3',
            text: 'Isotopes of an element differ in:',
            choices: [
              { id: 'a', text: 'Number of protons', isCorrect: false },
              { id: 'b', text: 'Number of neutrons', isCorrect: true },
              { id: 'c', text: 'Chemical properties', isCorrect: false },
              { id: 'd', text: 'Atomic number', isCorrect: false },
            ],
          },
          {
            id: 'chem-q1-4',
            text: 'The maximum number of electrons in the first shell is:',
            choices: [
              { id: 'a', text: '1', isCorrect: false },
              { id: 'b', text: '2', isCorrect: true },
              { id: 'c', text: '8', isCorrect: false },
              { id: 'd', text: '18', isCorrect: false },
            ],
          },
          {
            id: 'chem-q1-5',
            text: 'Who proposed the planetary model of the atom?',
            choices: [
              { id: 'a', text: 'Dalton', isCorrect: false },
              { id: 'b', text: 'Thomson', isCorrect: false },
              { id: 'c', text: 'Rutherford/Bohr', isCorrect: true },
              { id: 'd', text: 'Schrödinger', isCorrect: false },
            ],
          },
        ],
      },
      {
        id: 'chem-q2',
        title: 'Chemical Bonding',
        questions: [
          {
            id: 'chem-q2-1',
            text: 'An ionic bond is formed by:',
            choices: [
              { id: 'a', text: 'Sharing electrons', isCorrect: false },
              { id: 'b', text: 'Transfer of electrons', isCorrect: true },
              { id: 'c', text: 'Sharing protons', isCorrect: false },
              { id: 'd', text: 'Attraction of neutrons', isCorrect: false },
            ],
          },
          {
            id: 'chem-q2-2',
            text: 'A covalent bond involves:',
            choices: [
              { id: 'a', text: 'Transfer of electrons', isCorrect: false },
              { id: 'b', text: 'Sharing of electrons', isCorrect: true },
              { id: 'c', text: 'Metallic bonding', isCorrect: false },
              { id: 'd', text: 'Hydrogen bonding', isCorrect: false },
            ],
          },
          {
            id: 'chem-q2-3',
            text: 'Water (H₂O) has what type of bonding?',
            choices: [
              { id: 'a', text: 'Ionic', isCorrect: false },
              { id: 'b', text: 'Covalent', isCorrect: true },
              { id: 'c', text: 'Metallic', isCorrect: false },
              { id: 'd', text: 'Van der Waals', isCorrect: false },
            ],
          },
          {
            id: 'chem-q2-4',
            text: 'The electronegativity trend in the periodic table:',
            choices: [
              { id: 'a', text: 'Decreases across a period', isCorrect: false },
              { id: 'b', text: 'Increases across a period and decreases down a group', isCorrect: true },
              { id: 'c', text: 'Is constant', isCorrect: false },
              { id: 'd', text: 'Increases down a group', isCorrect: false },
            ],
          },
          {
            id: 'chem-q2-5',
            text: 'A molecule with equal sharing of electrons is:',
            choices: [
              { id: 'a', text: 'Polar', isCorrect: false },
              { id: 'b', text: 'Nonpolar', isCorrect: true },
              { id: 'c', text: 'Ionic', isCorrect: false },
              { id: 'd', text: 'Metallic', isCorrect: false },
            ],
          },
        ],
      },
      {
        id: 'chem-q3',
        title: 'Chemical Reactions',
        questions: [
          {
            id: 'chem-q3-1',
            text: 'In a balanced equation, what must be equal on both sides?',
            choices: [
              { id: 'a', text: 'Molecules', isCorrect: false },
              { id: 'b', text: 'Atoms of each element', isCorrect: true },
              { id: 'c', text: 'Coefficients', isCorrect: false },
              { id: 'd', text: 'Subscripts', isCorrect: false },
            ],
          },
          {
            id: 'chem-q3-2',
            text: 'A reaction that releases heat is called:',
            choices: [
              { id: 'a', text: 'Endothermic', isCorrect: false },
              { id: 'b', text: 'Exothermic', isCorrect: true },
              { id: 'c', text: 'Isothermic', isCorrect: false },
              { id: 'd', text: 'Catalytic', isCorrect: false },
            ],
          },
          {
            id: 'chem-q3-3',
            text: 'What type of reaction is: 2H₂ + O₂ → 2H₂O?',
            choices: [
              { id: 'a', text: 'Decomposition', isCorrect: false },
              { id: 'b', text: 'Synthesis/Combination', isCorrect: true },
              { id: 'c', text: 'Single replacement', isCorrect: false },
              { id: 'd', text: 'Double replacement', isCorrect: false },
            ],
          },
          {
            id: 'chem-q3-4',
            text: 'A catalyst:',
            choices: [
              { id: 'a', text: 'Is consumed in the reaction', isCorrect: false },
              { id: 'b', text: 'Speeds up a reaction without being consumed', isCorrect: true },
              { id: 'c', text: 'Changes the products', isCorrect: false },
              { id: 'd', text: 'Slows down reactions', isCorrect: false },
            ],
          },
          {
            id: 'chem-q3-5',
            text: 'pH of a neutral solution is:',
            choices: [
              { id: 'a', text: '0', isCorrect: false },
              { id: 'b', text: '7', isCorrect: true },
              { id: 'c', text: '14', isCorrect: false },
              { id: 'd', text: '1', isCorrect: false },
            ],
          },
        ],
      },
    ],
    riddles: [
      { id: 'chem-r1', question: 'I am everywhere but you cannot see me. I give life to everything. What element am I?', answer: 'Air (a mixture containing oxygen, nitrogen, etc.)' },
      { id: 'chem-r2', question: 'I am a soft silver metal that explodes in water. What am I?', answer: 'Sodium (Na)' },
      { id: 'chem-r3', question: 'What element has the atomic number 79 and is prized for its beauty?', answer: 'Gold (Au)' },
    ],
    videos: [
      { id: 'chem-v1', title: 'Atomic Structure Basics', path: '/videos/chemistry-atomic-structure.mp4', order: 1, duration: '19:00' },
      { id: 'chem-v2', title: 'Chemical Bonding', path: '/videos/chemistry-bonding.mp4', order: 2, duration: '23:30' },
      { id: 'chem-v3', title: 'Chemical Reactions', path: '/videos/chemistry-reactions.mp4', order: 3, duration: '20:45' },
      { id: 'chem-v4', title: 'Organic Chemistry Intro', path: '/videos/chemistry-organic-intro.mp4', order: 4, duration: '26:00' },
    ],
    materials: [
      { id: 'chem-m1', title: 'Periodic Table Reference', path: '/materials/chemistry-periodic-table.pdf', subjectId: 'chemistry', type: 'pdf' },
      { id: 'chem-m2', title: 'Reaction Types Guide', path: '/materials/chemistry-reaction-types.pdf', subjectId: 'chemistry', type: 'pdf' },
    ],
  },
];
