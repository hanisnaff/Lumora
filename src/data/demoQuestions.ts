import { AssessmentQuestion, LessonContent, PracticeQuestion, ConceptId, ConceptMastery } from '../types/learning';

export const INITIAL_CONCEPTS: Record<ConceptId, ConceptMastery> = {
  'memory-addresses': {
    conceptId: 'memory-addresses',
    conceptName: 'Memory Addresses (&)',
    score: 0,
    status: 'needs-review',
    questionsTested: 0,
    correctAnswers: 0,
  },
  'pointer-declaration': {
    conceptId: 'pointer-declaration',
    conceptName: 'Pointer Declaration (Type*)',
    score: 0,
    status: 'needs-review',
    questionsTested: 0,
    correctAnswers: 0,
  },
  'dereferencing': {
    conceptId: 'dereferencing',
    conceptName: 'Dereferencing (*ptr)',
    score: 0,
    status: 'needs-review',
    questionsTested: 0,
    correctAnswers: 0,
  },
  'pointer-assignment': {
    conceptId: 'pointer-assignment',
    conceptName: 'Pointer Assignment & Mutation',
    score: 0,
    status: 'needs-review',
    questionsTested: 0,
    correctAnswers: 0,
  },
  'pointer-safety': {
    conceptId: 'pointer-safety',
    conceptName: 'Null Pointers & Safety',
    score: 0,
    status: 'needs-review',
    questionsTested: 0,
    correctAnswers: 0,
  },
};

export const DIAGNOSTIC_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    conceptId: 'memory-addresses',
    conceptName: 'Memory Addresses (&)',
    question: 'In C++, what does the address-of operator (&) evaluate to when applied to a variable?',
    codeSnippet: `int score = 42;
std::cout << &score;`,
    options: [
      'The value 42 stored in the variable',
      'The memory address where the variable score is stored in RAM',
      'A duplicate copy of the score variable',
      'A reference that increments the score variable by 1',
    ],
    correctOptionIndex: 1,
    explanation:
      'The & operator (address-of) returns the physical or virtual memory address (in hexadecimal format) where the variable resides in memory, rather than its contents.',
  },
  {
    id: 2,
    conceptId: 'pointer-declaration',
    conceptName: 'Pointer Declaration (Type*)',
    question: 'Which of the following is the correct syntax to declare a pointer named ptr that points to an integer variable number?',
    codeSnippet: `int number = 100;
// Which line correctly stores the location of number?`,
    options: [
      'int ptr = &number;',
      'int* ptr = number;',
      'int* ptr = &number;',
      'int &ptr = *number;',
    ],
    correctOptionIndex: 2,
    explanation:
      'In C++, `int* ptr` declares a pointer variable that holds the address of an integer. We assign it `&number` (the address of number).',
  },
  {
    id: 3,
    conceptId: 'dereferencing',
    conceptName: 'Dereferencing (*ptr)',
    question: 'What will be printed to the console after executing this code snippet?',
    codeSnippet: `int val = 25;
int* p = &val;
*p = 50;
std::cout << val;`,
    options: [
      '25',
      '50',
      'A hexadecimal memory address',
      'Compilation error: cannot modify through a pointer',
    ],
    correctOptionIndex: 1,
    explanation:
      'The dereference operator `*p` directly accesses the memory location pointed to by `p`. Assigning `*p = 50` alters the value inside `val` itself. Thus, `val` becomes 50.',
  },
  {
    id: 4,
    conceptId: 'pointer-assignment',
    conceptName: 'Pointer Assignment & Mutation',
    question: 'Given the code below, what does the variable b equal at the end of execution?',
    codeSnippet: `int a = 5;
int b = 10;
int* ptr = &a;
ptr = &b;
*ptr = 20;`,
    options: [
      '5',
      '10',
      '20',
      'Undefined behavior',
    ],
    correctOptionIndex: 2,
    explanation:
      '`ptr` was initially pointing to `a`, but `ptr = &b` reassigns `ptr` to hold the address of `b`. Next, `*ptr = 20` writes 20 into the location of `b`. `a` remains 5, and `b` becomes 20.',
  },
  {
    id: 5,
    conceptId: 'pointer-safety',
    conceptName: 'Null Pointers & Safety',
    question: 'What is the danger of executing the following line without proper initialization?',
    codeSnippet: `int* uninitPtr;
*uninitPtr = 99;`,
    options: [
      'C++ automatically allocates new memory on the heap for 99',
      'It creates a warning but runs safely by defaulting to address 0x0',
      'It attempts to write to an arbitrary memory address, causing undefined behavior or a crash (segmentation fault)',
      'The compiler automatically converts uninitPtr to nullptr',
    ],
    correctOptionIndex: 2,
    explanation:
      'An uninitialized local pointer contains indeterminate garbage memory data. Dereferencing it writes to an arbitrary memory location, which can corrupt program memory or trigger an OS segmentation fault.',
  },
];

export const DEMO_LESSONS: Record<ConceptId, LessonContent> = {
  'dereferencing': {
    conceptId: 'dereferencing',
    conceptName: 'Dereferencing (*ptr)',
    title: 'Accessing and Modifying Values Through Pointers',
    subtitle: 'Learn how the asterisk (*) lets you follow the address stored in a pointer to inspect or change the actual data.',
    badge: 'Core Concept',
    estimatedMinutes: 6,
    primaryExplanation:
      'A pointer holds an address, not data directly. When you place the asterisk (*) in front of an existing pointer variable (e.g. `*ptr`), you tell C++ to "follow the address and work with the memory box at that destination." Reading `*ptr` retrieves the target value, while writing `*ptr = new_val` overwrites the target variable.',
    alternateExplanation:
      'Think of a pointer like a sticky note with a locker number written on it. The pointer itself is just the piece of paper. "Dereferencing" means actually walking over to that locker, unlocking it, and reading or swapping what is inside.',
    analogy: {
      title: 'The Safe Deposit Box Key Analogy',
      text: 'Having a key with tag #402 is not the same as holding gold. The key points to box #402. When you use the key to open box #402 and place gold inside, you are dereferencing. If two people have keys to box #402, changes made by one are immediately visible to the other.',
    },
    codeExample: {
      code: `int number = 10;
int* ptr = &number;   // ptr stores the address of number

std::cout << *ptr;   // Reads 10 (dereferencing)

*ptr = 42;           // Modifies number directly through the pointer
std::cout << number; // Outputs 42!`,
      steps: [
        { line: 1, explanation: 'Allocates memory for an integer `number` on the stack with initial value 10.' },
        { line: 2, explanation: 'Uses `&number` to retrieve the address of `number` and assigns it to pointer `ptr`.' },
        { line: 4, explanation: '`*ptr` dereferences `ptr`. It looks up address `0x7ffee1` and reads the value 10.' },
        { line: 6, explanation: '`*ptr = 42` writes 42 into that exact memory cell. `number` is now changed to 42.' },
      ],
    },
    memoryDiagram: {
      variableName: 'number',
      value: '42 (was 10)',
      address: '0x7ffed40',
      pointerName: 'ptr',
      pointerValue: '0x7ffed40',
      pointerAddress: '0x7ffed48',
    },
    commonMistakes: [
      {
        mistake: 'Confusing declaration * with dereference *',
        correction: 'In `int* p`, `*` is part of the type. In `*p = 5`, `*` is the dereference operator.',
        why: 'The same symbol has two distinct roles depending on whether it appears during type declaration or in an expression.',
      },
      {
        mistake: 'Forgetting * when modifying the target value',
        correction: 'Write `*ptr = 20;` instead of `ptr = 20;`',
        why: 'Writing `ptr = 20` attempts to set the pointer to point to address 20, causing a compilation error or severe memory violation.',
      },
    ],
    checkQuestion: {
      question: 'Given `int x = 7; int* px = &x;`, what is the effect of `*px = *px + 3;`?',
      options: [
        'px now points to address 10',
        'x becomes 10',
        'x remains 7 and px increments by 3 bytes',
        'Compilation error',
      ],
      correctIndex: 1,
      explanation:
        '`*px` on the right side reads 7; 7 + 3 is 10. `*px` on the left side stores 10 back into x.',
    },
  },
  'memory-addresses': {
    conceptId: 'memory-addresses',
    conceptName: 'Memory Addresses (&)',
    title: 'Understanding Physical & Virtual Memory Locations',
    subtitle: 'Every variable in your program lives at a specific numbered memory cell in RAM.',
    badge: 'Foundational',
    estimatedMinutes: 5,
    primaryExplanation:
      'When your program declares a variable, the operating system allocates a block of memory bytes. The starting byte of this block is known as its memory address, typically represented as a hexadecimal number (e.g. `0x7ffee4`). The `&` operator allows your code to inspect this location.',
    alternateExplanation:
      'Every house in a city has an address, like 742 Evergreen Terrace. The house contains people and furniture (the data), but the street address tells postal workers where to go. The `&` operator is like looking up the address in the city registry.',
    analogy: {
      title: 'The Hotel Room Analogy',
      text: 'Room 304 is the address. The guest staying inside is the value. Two different guests can occupy Room 304 over time, but the room number remains the same.',
    },
    codeExample: {
      code: `double price = 19.99;
std::cout << "Value:   " << price << "\\n";
std::cout << "Address: " << &price << "\\n";`,
      steps: [
        { line: 1, explanation: 'Declares double variable `price` occupying 8 bytes in memory.' },
        { line: 2, explanation: 'Prints the value 19.99 stored inside `price`.' },
        { line: 3, explanation: '`&price` queries the compiler/OS for the starting address in memory.' },
      ],
    },
    memoryDiagram: {
      variableName: 'price',
      value: '19.99',
      address: '0x7ffd120',
      pointerName: '(none)',
      pointerValue: 'N/A',
      pointerAddress: 'N/A',
    },
    commonMistakes: [
      {
        mistake: 'Assuming addresses remain constant across different program runs',
        correction: 'Memory addresses are assigned dynamically by the OS upon execution (ASLR).',
        why: 'Modern operating systems randomize stack/heap layout for security reasons.',
      },
    ],
    checkQuestion: {
      question: 'If `int a = 5; int b = 5;`, will `&a == &b` evaluate to true?',
      options: [
        'Yes, because both variables hold the same value 5',
        'No, because each variable is allocated its own distinct memory slot',
        'Yes, C++ optimizes identical integers into one shared address',
        'It depends on whether optimization flags are enabled',
      ],
      correctIndex: 1,
      explanation:
        'Variables `a` and `b` are separate identifiers with distinct storage locations, so `&a` and `&b` are different addresses.',
    },
  },
  'pointer-declaration': {
    conceptId: 'pointer-declaration',
    conceptName: 'Pointer Declaration (Type*)',
    title: 'Declaring Pointer Types and Storing Addresses',
    subtitle: 'Understand how C++ pointer types are declared and why the base type matters.',
    badge: 'Core Syntax',
    estimatedMinutes: 5,
    primaryExplanation:
      'A pointer declaration specifies both that the variable is a pointer and what type of data it points to. For example, `int* ptr` means "ptr holds the address of an integer". The type informs the compiler how many bytes to read and how arithmetic works.',
    alternateExplanation:
      'If you have a business card, it is not enough to just say "this is an address". You need to know if it is the address of an apartment, a warehouse, or a skyscraper so you know what to expect when you arrive.',
    analogy: {
      title: 'The Shipping Label Analogy',
      text: 'A shipping label marked "FRAGILE GLASSWARE" tells handlers how to treat the box at the destination address. Similarly, `char*` tells C++ to treat the destination as 1-byte characters, while `int*` treats it as a 4-byte integer.',
    },
    codeExample: {
      code: `int age = 21;
int* pAge = &age;     // pAge holds address of an int

char letter = 'M';
char* pLetter = &letter; // pLetter holds address of a char`,
      steps: [
        { line: 1, explanation: 'Creates integer `age`.' },
        { line: 2, explanation: '`int*` matches the type of `age`, allowing `pAge` to safely store `&age`.' },
        { line: 4, explanation: 'Creates char `letter`.' },
        { line: 5, explanation: '`char*` matches the type of `letter`.' },
      ],
    },
    memoryDiagram: {
      variableName: 'age',
      value: '21',
      address: '0x7ffea10',
      pointerName: 'pAge',
      pointerValue: '0x7ffea10',
      pointerAddress: '0x7ffea18',
    },
    commonMistakes: [
      {
        mistake: 'Assigning a value directly to a pointer without &',
        correction: 'Use `int* p = &var;` instead of `int* p = var;`',
        why: 'Pointers store addresses. Assigning an integer value directly attempts to treat that integer as a memory address.',
      },
    ],
    checkQuestion: {
      question: 'Which declaration allows storing the address of a `float` variable?',
      options: ['float &p;', 'float* p;', '*float p;', 'address<float> p;'],
      correctIndex: 1,
      explanation: 'In C++, pointer syntax places the `*` after the base type: `float* p;`.',
    },
  },
  'pointer-assignment': {
    conceptId: 'pointer-assignment',
    conceptName: 'Pointer Assignment & Mutation',
    title: 'Reassigning Pointers vs Mutating Targets',
    subtitle: 'Distinguish between changing where a pointer points and changing what is inside the destination.',
    badge: 'Intermediate',
    estimatedMinutes: 6,
    primaryExplanation:
      'There is a fundamental difference between `ptr = &other;` and `*ptr = other;`. The first changes the address stored inside `ptr` itself (redirecting where it points). The second follows the pointer and updates the value in the current destination.',
    alternateExplanation:
      'Changing where your GPS navigates is reassigning the pointer. Painting the house you arrived at is dereferencing and mutating.',
    analogy: {
      title: 'The Bookmark Analogy',
      text: 'Moving your bookmark to page 150 changes the bookmark pointer. Erasing a word on the page you are currently reading modifies the page contents.',
    },
    codeExample: {
      code: `int first = 100;
int second = 200;

int* p = &first; // p points to first
*p = 105;        // first becomes 105

p = &second;     // p now points to second
*p = 205;        // second becomes 205`,
      steps: [
        { line: 4, explanation: '`p` is bound to the address of `first`.' },
        { line: 5, explanation: '`*p = 105` modifies `first`. `second` is unaffected.' },
        { line: 7, explanation: '`p = &second` re-aims `p` to point to `second`.' },
        { line: 8, explanation: '`*p = 205` modifies `second`. `first` remains 105.' },
      ],
    },
    memoryDiagram: {
      variableName: 'second',
      value: '205',
      address: '0x7ffe920',
      pointerName: 'p',
      pointerValue: '0x7ffe920 (re-aimed)',
      pointerAddress: '0x7ffe928',
    },
    commonMistakes: [
      {
        mistake: 'Assuming pointer reassignment changes the previous variable',
        correction: 'Reassigning `p = &b` only changes `p`; it does not touch the variable `p` previously pointed to.',
        why: 'The pointer is its own variable with its own storage location.',
      },
    ],
    checkQuestion: {
      question: 'If `int a = 1; int b = 2; int* p = &a; p = &b;`, what does `*p` evaluate to?',
      options: ['1', '2', 'Address of a', '3'],
      correctIndex: 1,
      explanation: 'Since `p` was redirected to `&b`, dereferencing `*p` now accesses `b`, yielding 2.',
    },
  },
  'pointer-safety': {
    conceptId: 'pointer-safety',
    conceptName: 'Null Pointers & Safety',
    title: 'Safe Pointer Handling and nullptr',
    subtitle: 'Avoid segmentation faults and undefined behavior with defensive pointer patterns.',
    badge: 'Best Practice',
    estimatedMinutes: 5,
    primaryExplanation:
      'In modern C++ (C++11 and later), always initialize pointers that do not yet have a target to `nullptr`. Before dereferencing any pointer that might be empty, check `if (ptr != nullptr)`.',
    alternateExplanation:
      'Never drive towards an address that is blank or scribbled with gibberish. If you don\'t have a valid destination yet, write "NONE" (nullptr) and check it before driving.',
    analogy: {
      title: 'The Closed Restaurant Sign',
      text: 'Checking `nullptr` is like checking the "Open / Closed" sign on a shop door before trying to walk inside.',
    },
    codeExample: {
      code: `int* safePtr = nullptr; // Explicitly empty

if (safePtr != nullptr) {
    *safePtr = 10;       // Will NOT execute; safely guarded
} else {
    std::cout << "Pointer is currently empty, safe from crash!\\n";
}`,
      steps: [
        { line: 1, explanation: 'Initializes `safePtr` to `nullptr` (address 0x0).' },
        { line: 3, explanation: 'The guard condition evaluates to false, skipping dereference.' },
        { line: 6, explanation: 'Safe branch executed cleanly without segmentation fault.' },
      ],
    },
    memoryDiagram: {
      variableName: '(none)',
      value: 'N/A',
      address: 'N/A',
      pointerName: 'safePtr',
      pointerValue: '0x0 (nullptr)',
      pointerAddress: '0x7ffe700',
    },
    commonMistakes: [
      {
        mistake: 'Leaving pointers uninitialized: int* p;',
        correction: 'Always initialize: int* p = nullptr; or int* p = &var;',
        why: 'Uninitialized pointers contain unpredictable stack garbage that looks like a real address.',
      },
    ],
    checkQuestion: {
      question: 'What happens if you evaluate `*ptr` when `ptr == nullptr`?',
      options: [
        'It returns 0',
        'It allocates a new default integer',
        'Undefined behavior, typically resulting in an immediate program crash',
        'It outputs a compiler warning',
      ],
      correctIndex: 2,
      explanation: 'Dereferencing a nullptr attempts to read protected kernel address 0x0, triggering an immediate OS exception.',
    },
  },
};

export const TARGETED_PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 101,
    conceptId: 'dereferencing',
    conceptName: 'Dereferencing (*ptr)',
    difficulty: 'Beginner',
    question: 'What is the output of the following C++ code snippet?',
    codeSnippet: `int a = 12;
int* ptr = &a;
*ptr = *ptr * 2;
std::cout << a;`,
    options: ['12', '24', '48', 'Undefined memory address'],
    correctOptionIndex: 1,
    explanation: '`*ptr` evaluates to 12. Multiplying by 2 yields 24, which is stored back into `a` through the pointer dereference.',
  },
  {
    id: 102,
    conceptId: 'dereferencing',
    conceptName: 'Dereferencing (*ptr)',
    difficulty: 'Intermediate',
    question: 'Trace the variables in this pointer swap attempt. What will be printed?',
    codeSnippet: `int x = 5, y = 9;
int* px = &x;
int* py = &y;

int temp = *px;
*px = *py;
*py = temp;

std::cout << x << " " << y;`,
    options: ['5 9', '9 5', '5 5', '9 9'],
    correctOptionIndex: 1,
    explanation: 'The code dereferences `px` and `py` to execute a classic three-step swap on the actual memory locations of `x` and `y`. `x` becomes 9 and `y` becomes 5.',
  },
  {
    id: 103,
    conceptId: 'dereferencing',
    conceptName: 'Dereferencing (*ptr)',
    difficulty: 'Advanced',
    question: 'What does this function do to the integer passed into it?',
    codeSnippet: `void resetIfNegative(int* pVal) {
    if (pVal != nullptr && *pVal < 0) {
        *pVal = 0;
    }
}

int score = -15;
resetIfNegative(&score);
std::cout << score;`,
    options: [
      '-15 (pointers cannot mutate parameters)',
      '0 (dereferencing modifies the original score in caller frame)',
      'Compilation error',
      'Segmentation fault',
    ],
    correctOptionIndex: 1,
    explanation: 'Because `&score` was passed, `pVal` receives its address. The condition `*pVal < 0` checks the value (-15) and `*pVal = 0` mutates `score` in the caller frame to 0.',
  },
  {
    id: 104,
    conceptId: 'memory-addresses',
    conceptName: 'Memory Addresses (&)',
    difficulty: 'Beginner',
    question: 'What operator is used to obtain the memory address of an existing variable in C++?',
    options: ['*', '&', '->', '@'],
    correctOptionIndex: 1,
    explanation: 'The `&` (ampersand) is the address-of operator in C++ when used as a unary prefix operator.',
  },
  {
    id: 105,
    conceptId: 'pointer-assignment',
    conceptName: 'Pointer Assignment & Mutation',
    difficulty: 'Intermediate',
    question: 'What will be printed by this code?',
    codeSnippet: `int val1 = 10;
int val2 = 20;
int* p = &val1;
int* q = &val2;

p = q;
*p = 35;

std::cout << val1 << " " << val2;`,
    options: ['35 20', '10 35', '35 35', '10 20'],
    correctOptionIndex: 1,
    explanation: '`p = q` assigns `q`\'s address (`&val2`) to `p`. Both pointers now point to `val2`. `*p = 35` changes `val2` to 35. `val1` remains untouched at 10.',
  },
  {
    id: 106,
    conceptId: 'pointer-safety',
    conceptName: 'Null Pointers & Safety',
    difficulty: 'Beginner',
    question: 'What keyword introduced in C++11 represents a type-safe null pointer constant?',
    options: ['NULL', '0', 'nullptr', 'nil'],
    correctOptionIndex: 2,
    explanation: '`nullptr` is a C++11 keyword that represents a null pointer constant of type `std::nullptr_t`, avoiding integer overload ambiguity that plagued NULL.',
  },
];
