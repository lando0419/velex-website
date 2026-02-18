export interface CaseStudyContent {
  problem: string
  approach: string
  simulation: string
  results: string
  specifications?: Record<string, string>
}

export interface Project {
  id: number
  slug: string
  title: string
  category: string
  description: string
  image: string
  status: 'complete' | 'in-progress' | 'coming-soon'
  stats?: Record<string, string>
  caseStudy?: CaseStudyContent
  metaTitle?: string
  metaDescription?: string
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: 'ur10e-adapter',
    title: 'UR10e Robot Adapter',
    category: 'robotics',
    description:
      'Custom end-effector adapter for Universal Robots UR10e. Designed for high-precision pick-and-place applications with integrated cable management.',
    image: '/demos/ur10e-adapter/hero.webp',
    status: 'in-progress',
    stats: { payload: '12.5 kg', stiffness: '+34%', weight: '0.42 kg' },
    metaTitle: 'UR10e Robot Adapter | IXRA Case Study',
    metaDescription:
      'Custom end-effector adapter for Universal Robots UR10e. FEA-validated design with +34% stiffness at 0.42 kg.',
    caseStudy: {
      problem:
        'A manufacturing client needed a custom end-effector adapter for their UR10e cobot line. The stock adapter was overweight and introduced compliance at the tool center point, reducing pick-and-place repeatability. Payload capacity was being wasted on adapter mass instead of tooling.',
      approach:
        'Started with a parametric CAD model constrained to the UR10e ISO 9409-1-50-4-M6 flange pattern. Ran topology optimization with payload, stiffness, and cable routing as competing objectives. The design space was bounded by the robot envelope and tool interference zones.',
      simulation:
        'Full structural FEA under worst-case payload (12.5 kg at 1.5g emergency stop). Thermal analysis for continuous operation at 40\u00B0C ambient. Modal analysis confirmed first natural frequency above the robot\'s maximum joint velocity excitation. Factor of safety 3.2 across all load cases.',
      results:
        '42% mass reduction versus the OEM adapter. Stiffness increased 34% at the tool center point. Integrated cable channels eliminated external cable management hardware. Design validated against UR10e payload curves with margin.',
      specifications: {
        Material: '7075-T6 Aluminum',
        Mass: '0.42 kg',
        'Payload Capacity': '12.5 kg',
        'Stiffness Gain': '+34% vs OEM',
        FoS: '3.2 (all load cases)',
        Flange: 'ISO 9409-1-50-4-M6',
      },
    },
  },
  {
    id: 2,
    slug: 'drone-frame',
    title: 'Racing Drone Frame',
    category: 'drones',
    description:
      'Lightweight 5-inch racing drone frame optimized for FPV competition. Carbon fiber layup with integrated vibration dampening.',
    image: '/demos/drone-frame/hero.webp',
    status: 'in-progress',
    stats: { weight: '128g', thrust: '4:1', durability: 'A+' },
    metaTitle: 'Racing Drone Frame | IXRA Case Study',
    metaDescription:
      '5-inch FPV racing drone frame. 128g carbon fiber with 4:1 thrust ratio and crash-optimized geometry.',
    caseStudy: {
      problem:
        'An FPV racing team needed a frame that could survive high-speed crashes while maintaining the lowest possible weight for competition. Off-the-shelf frames were either too heavy (180g+) or too fragile at the arm roots. They also needed integrated vibration dampening for clean HD video recording during races.',
      approach:
        'Designed in a parametric CAD environment with motor spacing, camera tilt, and battery placement as driving parameters. Used composite layup analysis to optimize carbon fiber orientation at high-stress zones (arm roots, standoff mounts). Crash simulation determined critical failure modes and drove geometry reinforcement.',
      simulation:
        'Impact FEA at 80 km/h into a rigid surface from multiple angles. Modal analysis to identify vibration modes and tune the FC soft-mount geometry. Composite failure analysis (Tsai-Wu criterion) for each ply in the laminate schedule. CFD on arm cross-sections to minimize drag.',
      results:
        '128g total frame weight, 28% lighter than the team\'s previous frame. Survived 50+ race crashes in testing with zero arm failures. Vibration at the FC mount reduced 60% versus the previous frame, enabling clean 4K recording without ND filters. Thrust-to-weight ratio maintained above 4:1 with standard 2207 motors.',
      specifications: {
        Material: 'T700 Carbon Fiber (3K twill)',
        'Frame Weight': '128g',
        Wheelbase: '220mm (5-inch)',
        'Thrust:Weight': '4:1 minimum',
        'Impact Survival': '80 km/h (tested)',
        'Vibration Reduction': '-60% at FC mount',
      },
    },
  },
  {
    id: 3,
    slug: 'suspension-arm',
    title: 'Suspension A-Arm',
    category: 'automotive',
    description:
      'Performance suspension component for track-day vehicles. Topology-optimized for minimum weight with maximum stiffness.',
    image: '/demos/suspension-arm/hero.webp',
    status: 'in-progress',
    stats: { reduction: '-42%', stiffness: '+18%', cycles: '500k+' },
    metaTitle: 'Suspension A-Arm | IXRA Case Study',
    metaDescription:
      'Topology-optimized suspension A-arm. 42% lighter with +18% stiffness, validated to 500k+ fatigue cycles.',
    caseStudy: {
      problem:
        'A track-day enthusiast building a time-attack car needed lighter suspension arms without sacrificing stiffness. The OEM cast iron arms were overbuilt for street duty but poorly optimized for track loads. Reducing unsprung mass was the highest-impact change remaining in the suspension system.',
      approach:
        'Extracted hardpoint geometry from a 3D scan of the existing suspension. Defined the design space as the maximum envelope that clears the wheel, brake, and spring assembly through full travel. Topology optimization with stiffness maximization as the objective, subject to a mass target of 60% of OEM.',
      simulation:
        'Multi-axis structural FEA under combined braking, cornering, and bump loads extracted from on-car data logging. Fatigue analysis (S-N approach) with the actual load spectrum from 10 hot laps. Buckling analysis of the optimized thin-wall geometry. Contact stress at the spherical bearing interfaces.',
      results:
        '42% mass reduction (cast iron to machined 7075-T6). Stiffness increased 18% in the primary loading direction despite the mass reduction. Fatigue life exceeds 500k cycles at the measured track load spectrum, equivalent to 50+ track days. Ball joint packaging maintained OEM kinematics.',
      specifications: {
        Material: '7075-T6 Aluminum (machined)',
        'Mass Reduction': '-42% vs OEM',
        Stiffness: '+18% primary axis',
        'Fatigue Life': '500k+ cycles',
        'Load Case': 'Combined 2.0g braking + 1.5g lateral',
        FoS: '2.8 minimum',
      },
    },
  },
  {
    id: 4,
    slug: 'satellite-bracket',
    title: 'Satellite Bracket',
    category: 'aerospace',
    description:
      'Flight-qualified mounting bracket for CubeSat payloads. Designed for space environment with thermal cycling considerations.',
    image: '/demos/satellite-bracket/hero.webp',
    status: 'in-progress',
    stats: { mass: '86g', tempRange: '-40\u00B0C to +85\u00B0C', FoS: '3.2' },
    metaTitle: 'Satellite Bracket | IXRA Case Study',
    metaDescription:
      'CubeSat payload bracket. 86g, qualified for -40 to +85\u00B0C thermal cycling with 3.2 factor of safety.',
    caseStudy: {
      problem:
        'A university CubeSat team needed a payload mounting bracket that could survive launch vibration, thermal cycling in LEO, and maintain alignment of an optical sensor to within 0.1 degrees. Mass budget was 120g maximum. The bracket had to be manufactured with university-accessible CNC equipment.',
      approach:
        "Modeled the bracket within the CubeSat rail and payload volume constraints. Thermal expansion matching between the aluminum bracket and the optical sensor's titanium housing drove material selection. Topology optimization under combined quasi-static launch loads (12g axial, 6g lateral per NASA GEVS) and thermal gradient loads.",
      simulation:
        'Random vibration analysis per NASA GEVS (14.1 Grms). Quasi-static launch load analysis at limit and ultimate levels. Thermal cycling FEA from -40\u00B0C to +85\u00B0C (1000 cycles, LEO thermal environment). Thermo-elastic deformation analysis to verify optical alignment budget. Modal analysis to confirm no coupling with launch vehicle modes.',
      results:
        '86g final mass, 28% under budget. Factor of safety 3.2 at ultimate load. Optical sensor alignment maintained within 0.04 degrees through full thermal range, well within the 0.1 degree requirement. First natural frequency at 340 Hz, above the 100 Hz launch vehicle requirement. Design cleared for flight review.',
      specifications: {
        Material: '6061-T6 Aluminum',
        Mass: '86g',
        'Temp Range': '-40\u00B0C to +85\u00B0C',
        FoS: '3.2 (ultimate)',
        'First Mode': '340 Hz',
        Alignment: '<0.04\u00B0 thermal distortion',
      },
    },
  },
  {
    id: 5,
    slug: 'gripper',
    title: 'Industrial Gripper',
    category: 'robotics',
    description:
      'Pneumatic parallel gripper for manufacturing automation. High-cycle life with integrated force sensing mounting.',
    image: '/demos/gripper/hero.webp',
    status: 'coming-soon',
    stats: { force: '120N', cycles: '2M+', repeatability: '\u00B10.02mm' },
  },
  {
    id: 6,
    slug: 'ebike-mount',
    title: 'E-Bike Motor Mount',
    category: 'ev',
    description:
      'Mid-drive motor integration bracket for electric bicycle conversion. Heat-dissipating design with vibration isolation.',
    image: '/demos/ebike-mount/hero.webp',
    status: 'coming-soon',
    stats: { power: '750W', cooling: '+45%', weight: '0.34 kg' },
  },
  {
    id: 7,
    slug: 'prosthetic',
    title: 'Prosthetic Socket',
    category: 'medical',
    description:
      'Custom-fit below-knee prosthetic socket. Patient-specific design from 3D scan data with comfort optimization.',
    image: '/demos/prosthetic/hero.webp',
    status: 'coming-soon',
    stats: { fitScore: '98%', weight: '185g', comfort: 'A+' },
  },
  {
    id: 8,
    slug: 'rc-chassis',
    title: 'RC Car Chassis',
    category: 'hobby',
    description:
      '1/10 scale RC competition chassis plate. Impact-resistant design with optimized flex characteristics for handling.',
    image: '/demos/rc-chassis/hero.webp',
    status: 'coming-soon',
    stats: { flex: 'Tuned', impact: '+60%', weight: '142g' },
  },
  {
    id: 9,
    slug: 'turbine-housing',
    title: 'Turbine Housing',
    category: 'industrial',
    description:
      'High-temperature turbine scroll housing for turbocharger application. CFD-optimized flow paths with thermal management.',
    image: '/demos/turbine-housing/hero.webp',
    status: 'coming-soon',
    stats: { flow: '+12%', temp: '950\u00B0C', efficiency: '87%' },
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getCaseStudyProjects(): Project[] {
  return PROJECTS.filter((p) => p.caseStudy !== undefined)
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.filter((p) => p.caseStudy !== undefined).map((p) => p.slug)
}
