const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

const questions = [
    // ... (Existing 20 questions)
    {
        "company": "Amazon",
        "category": "Docker",
        "difficulty": "Easy",
        "question": "What is Docker?",
        "answer": "Docker is a containerization platform that packages applications and their dependencies into containers to run consistently across environments."
    },
    {
        "company": "Google",
        "category": "DevOps",
        "difficulty": "Easy",
        "question": "What is DevOps?",
        "answer": "DevOps is a culture and set of practices that combines software development and IT operations to automate and improve software delivery."
    },
    {
        "company": "Microsoft",
        "category": "CI/CD",
        "difficulty": "Easy",
        "question": "What is Continuous Integration?",
        "answer": "Continuous Integration is the practice of automatically integrating code changes into a shared repository with automated builds and tests."
    },
    {
        "company": "Amazon",
        "category": "Docker",
        "difficulty": "Medium",
        "question": "What is the difference between a Docker image and a container?",
        "answer": "A Docker image is a blueprint for creating containers, while a container is a running instance of that image."
    },
    {
        "company": "Netflix",
        "category": "Microservices",
        "difficulty": "Medium",
        "question": "What are microservices?",
        "answer": "Microservices is an architectural style where applications are built as a collection of loosely coupled services."
    },
    {
        "company": "Google",
        "category": "Kubernetes",
        "difficulty": "Medium",
        "question": "What is Kubernetes?",
        "answer": "Kubernetes is a container orchestration system that automates deployment, scaling, and management of containerized applications."
    },
    {
        "company": "Amazon",
        "category": "Networking",
        "difficulty": "Medium",
        "question": "What is a load balancer?",
        "answer": "A load balancer distributes incoming network traffic across multiple servers to ensure reliability and performance."
    },
    {
        "company": "Meta",
        "category": "Linux",
        "difficulty": "Easy",
        "question": "What is the difference between a process and a thread?",
        "answer": "A process is an independent program in execution, while a thread is a lightweight unit of execution within a process."
    },
    {
        "company": "Google",
        "category": "Git",
        "difficulty": "Easy",
        "question": "What is Git?",
        "answer": "Git is a distributed version control system used to track changes in source code."
    },
    {
        "company": "Amazon",
        "category": "Git",
        "difficulty": "Medium",
        "question": "What is the difference between git pull and git fetch?",
        "answer": "Git fetch downloads changes from a remote repository without merging them, while git pull fetches and merges them automatically."
    },
    {
        "company": "Microsoft",
        "category": "CI/CD",
        "difficulty": "Medium",
        "question": "What is a CI/CD pipeline?",
        "answer": "A CI/CD pipeline is an automated workflow that builds, tests, and deploys code changes."
    },
    {
        "company": "Netflix",
        "category": "DevOps",
        "difficulty": "Medium",
        "question": "What are the benefits of DevOps?",
        "answer": "DevOps improves collaboration, increases deployment frequency, reduces failure rates, and speeds up recovery times."
    },
    {
        "company": "Amazon",
        "category": "Docker",
        "difficulty": "Medium",
        "question": "What is a Dockerfile?",
        "answer": "A Dockerfile is a script containing instructions used to build a Docker image."
    },
    {
        "company": "Google",
        "category": "Kubernetes",
        "difficulty": "Hard",
        "question": "What is a Kubernetes pod?",
        "answer": "A Kubernetes pod is the smallest deployable unit in Kubernetes that can contain one or more containers."
    },
    {
        "company": "Microsoft",
        "category": "Cloud",
        "difficulty": "Medium",
        "question": "What is Infrastructure as Code?",
        "answer": "Infrastructure as Code is the practice of managing infrastructure using configuration files instead of manual processes."
    },
    {
        "company": "Amazon",
        "category": "Monitoring",
        "difficulty": "Medium",
        "question": "What is system monitoring?",
        "answer": "System monitoring tracks the performance and health of servers, applications, and infrastructure."
    },
    {
        "company": "Google",
        "category": "Security",
        "difficulty": "Medium",
        "question": "What is the principle of least privilege?",
        "answer": "It is a security concept where users and systems are given only the minimum access required."
    },
    {
        "company": "Meta",
        "category": "Linux",
        "difficulty": "Easy",
        "question": "What is the purpose of the chmod command?",
        "answer": "The chmod command changes file permissions in Linux."
    },
    {
        "company": "Netflix",
        "category": "Architecture",
        "difficulty": "Medium",
        "question": "What is a monolithic architecture?",
        "answer": "Monolithic architecture is a system design where all components are combined into a single application."
    },
    {
        "company": "Amazon",
        "category": "Containers",
        "difficulty": "Medium",
        "question": "What is containerization?",
        "answer": "Containerization packages an application and its dependencies into isolated environments that run consistently across systems."
    },
    // NEW HARD QUESTIONS
    {
        "company": "Google",
        "category": "Kubernetes",
        "difficulty": "Hard",
        "question": "Explain the Kubernetes Control Plane components and their roles.",
        "answer": "The Control Plane consists of: kube-apiserver (entry point), etcd (consistent store), kube-scheduler (assigns pods to nodes), and kube-controller-manager (runs controller processes)."
    },
    {
        "company": "Amazon",
        "category": "Security",
        "difficulty": "Hard",
        "question": "What is Seccomp and how is it used in container security?",
        "answer": "Secure Computing Mode (Seccomp) is a Linux kernel feature that restricts the system calls a process can make. In containers, it's used to reduce the kernel attack surface by blocking dangerous syscalls."
    },
    {
        "company": "Netflix",
        "category": "Architecture",
        "difficulty": "Hard",
        "question": "Explain Chaos Engineering and the role of 'Chaos Monkey'.",
        "answer": "Chaos Engineering is the discipline of experimenting on a system in order to build confidence in the system's capability to withstand turbulent conditions in production. Chaos Monkey was Netflix's first tool to randomly disable production instances to test resiliency."
    },
    {
        "company": "Microsoft",
        "category": "Cloud",
        "difficulty": "Hard",
        "question": "What are the common strategies for Blue-Green Deployments in a Kubernetes environment?",
        "answer": "Common strategies include using a Service to switch traffic between two identical deployments (Blue and Green), or using an Ingress controller/Service Mesh (like Istio) for weighted traffic shifting."
    },
    {
        "company": "Google",
        "category": "Linux",
        "difficulty": "Hard",
        "question": "Explain the difference between Hard Links and Soft (Symbolic) Links at the inode level.",
        "answer": "A hard link is an additional pointer to the same inode as the original file, while a soft link is a special file that contains the path to another file. Hard links cannot span file systems or link to directories."
    },
    {
        "company": "Apple",
        "category": "Networking",
        "difficulty": "Hard",
        "question": "How does BGP (Border Gateway Protocol) work in the context of Global Load Balancing?",
        "answer": "BGP is used in 'Anycast' networking to announce the same IP address from multiple locations. Traffic is routed to the nearest instance geographically based on BGP's path selection, effectively acting as a global load balancer."
    },
    {
        "company": "Meta",
        "category": "Kubernetes",
        "difficulty": "Hard",
        "question": "What is an Operator in Kubernetes, and how does it differ from a Controller?",
        "answer": "A Controller is a control loop that watches the shared state of the cluster. An Operator is a specific type of Controller that uses Custom Resource Definitions (CRDs) to manage complex, stateful applications using domain-specific knowledge."
    },
    {
        "company": "Amazon",
        "category": "Security",
        "difficulty": "Hard",
        "question": "How do you implement mTLS (Mutual TLS) in a microservices architecture?",
        "answer": "mTLS is typically implemented using a Service Mesh like Istio or Linkerd, which manages the issuance and rotation of certificates for each service and enforces encrypted, authenticated communication between sidecar proxies."
    },
    {
        "company": "Google",
        "category": "SRE",
        "difficulty": "Hard",
        "question": "What is the difference between an SLO, SLI, and SLA?",
        "answer": "SLI (Indicator) is a quantitative measure (e.g., latency). SLO (Objective) is a target value for an SLI (e.g., latency < 200ms). SLA (Agreement) is a legal contract that defines consequences if SLOs are not met."
    },
    {
        "company": "Netflix",
        "category": "CI/CD",
        "difficulty": "Hard",
        "question": "What is Canary Deployment and how do you automate its rollback?",
        "answer": "Canary deployment rolls out a change to a small subset of users before the full rollout. Automation involves monitoring health metrics (error rate, latency) and triggering a script to point traffic back to the stable version if thresholds are exceeded."
    },
    {
        "company": "Meta",
        "category": "Networking",
        "difficulty": "Hard",
        "question": "Explain the TCP Three-Way Handshake and the vulnerabilities associated with it.",
        "answer": "SYN -> SYN-ACK -> ACK. It's used to establish a reliable connection. A common vulnerability is the 'SYN Flood' attack, where an attacker sends many SYN requests but never sends the final ACK, exhausting server resources."
    },
    {
        "company": "Apple",
        "category": "Docker",
        "difficulty": "Hard",
        "question": "What are Multi-stage builds in Docker and how do they optimize image size?",
        "answer": "Multi-stage builds use multiple FROM instructions in a single Dockerfile. You can use different base images for 'build' and 'run' stages, only copying the final compiled artifacts to the production image, leaving behind build tools and intermediate layers."
    },
    {
        "company": "Google",
        "category": "Linux",
        "difficulty": "Hard",
        "question": "Explain the purpose and function of the Linux 'Init' system (Systemd vs SysVinit).",
        "answer": "The Init system is the first process (PID 1) started by the kernel. SysVinit uses sequential scripts, while Systemd supports parallel service startup using sockets, manages dependencies better, and provides a unified interface (systemctl)."
    },
    {
        "company": "Microsoft",
        "category": "Kubernetes",
        "difficulty": "Hard",
        "question": "What is a Sidecar container and give a real-world use case.",
        "answer": "A sidecar is a container that runs alongside the main application container in the same pod. Use cases include log shipping (Fluentd), proxying traffic (Envoy/Istio), or external configuration management."
    },
    {
        "company": "Amazon",
        "category": "Cloud",
        "difficulty": "Hard",
        "question": "Explain the 'Shared Responsibility Model' in Cloud Computing.",
        "answer": "The cloud provider is responsible for security 'of' the cloud (hardware, global infrastructure). The customer is responsible for security 'in' the cloud (guest OS, firewall config, data, IAM)."
    },
    // NEW BATCH OF 30 QUESTIONS
    {
        "company": "Google",
        "category": "Kubernetes",
        "difficulty": "Medium",
        "question": "What is a DaemonSet in Kubernetes?",
        "answer": "A DaemonSet ensures that all (or some) Nodes run a copy of a Pod. As nodes are added to the cluster, Pods are added to them. It is commonly used for logging agents or monitoring daemons."
    },
    {
        "company": "Amazon",
        "category": "Networking",
        "difficulty": "Easy",
        "question": "What is the difference between TCP and UDP?",
        "answer": "TCP is a connection-oriented, reliable protocol that guarantees delivery and order of packets. UDP is connectionless, faster, but does not guarantee delivery or order."
    },
    {
        "company": "Netflix",
        "category": "CI/CD",
        "difficulty": "Hard",
        "question": "Explain Spinnaker and how it differs from Jenkins.",
        "answer": "Spinnaker is a continuous delivery platform primarily built for multi-cloud deployments. While Jenkins is typically an all-purpose CI/CD orchestration tool heavily reliant on plugins and scripts, Spinnaker focuses natively on baking images and complex deployment pipelines (like Canary and red/black)."
    },
    {
        "company": "Microsoft",
        "category": "Cloud",
        "difficulty": "Medium",
        "question": "What is Terraform State and why is it important?",
        "answer": "Terraform state is a file (typically JSON) that maps real-world provisioned resources to your configuration. It is critical for tracking changes, improving performance by avoiding continuous API calls, and supporting team collaboration through remote state locking."
    },
    {
        "company": "Apple",
        "category": "Linux",
        "difficulty": "Hard",
        "question": "What is OOM Killer in Linux?",
        "answer": "The Out Of Memory (OOM) Killer is a process that the Linux kernel invokes when the system is critically low on memory. It analyzes running processes and terminates one (or more) processes with a high OOM score to free up memory entirely."
    },
    {
        "company": "Meta",
        "category": "Docker",
        "difficulty": "Medium",
        "question": "What are Docker Volumes and when to use them?",
        "answer": "Docker Volumes are the preferred mechanism for persisting data generated by and used by Docker containers. They are stored on the host filesystem and managed by Docker, completely isolated from the container's lifecycle."
    },
    {
        "company": "Google",
        "category": "SRE",
        "difficulty": "Hard",
        "question": "What is an Error Budget?",
        "answer": "An Error Budget is the maximum allowable threshold of errors and outages (defined by an SLO minus 100%). It aligns development and operations by allowing new feature releases as long as the error budget hasn't been depleted."
    },
    {
        "company": "Amazon",
        "category": "Security",
        "difficulty": "Medium",
        "question": "What is the purpose of IAM Roles in AWS?",
        "answer": "IAM Roles allow temporary, secure access to AWS resources for entities you trust (like EC2 instances, Lambda functions, or federated users), eliminating the need to hardcode permanent access keys."
    },
    {
        "company": "Netflix",
        "category": "Architecture",
        "difficulty": "Medium",
        "question": "What is the Circuit Breaker pattern?",
        "answer": "It is a design pattern used to detect failures and encapsulate the logic of preventing a failure from constantly recurring. If a downstream service fails, the circuit 'opens', returning a fallback response immediately rather than timing out."
    },
    {
        "company": "Microsoft",
        "category": "DevOps",
        "difficulty": "Easy",
        "question": "What is configuration drift?",
        "answer": "Configuration drift occurs when environments (like servers or clusters) gradually diverge from their original, intended state, usually due to undocumented manual changes or ad-hoc updates."
    },
    {
        "company": "Apple",
        "category": "Git",
        "difficulty": "Hard",
        "question": "How do you recover a dropped stash in Git?",
        "answer": "You can locate a dropped stash by finding unreachable commits using `git fsck --no-reflog | awk '/dangling commit/ {print $3}'`. You can then review them using `git show` and restore it using `git stash apply <commit-hash>`."
    },
    {
        "company": "Meta",
        "category": "Networking",
        "difficulty": "Hard",
        "question": "What is HTTP Strict Transport Security (HSTS)?",
        "answer": "HSTS is a web security policy mechanism that helps protect websites against man-in-the-middle attacks such as protocol downgrade attacks and cookie hijacking. It tells browsers that the site should only be interacted with using secure HTTPS connections."
    },
    {
        "company": "Google",
        "category": "Kubernetes",
        "difficulty": "Hard",
        "question": "Explain the difference between a StatefulSet and a Deployment.",
        "answer": "Deployments are designed for stateless applications where pods are interchangeable. StatefulSets exist for stateful applications requiring unique network identifiers, stable persistent storage across rescheduling, and ordered, elegant deployment and scaling."
    },
    {
        "company": "Amazon",
        "category": "Linux",
        "difficulty": "Medium",
        "question": "Explain 'inode' in a Linux file system.",
        "answer": "An inode (index node) is a data structure on a filesystem that stores all information about a regular file, directory, or other file system object, except its data and its name. This includes ownership, permissions, size, and physical location on disk."
    },
    {
        "company": "Netflix",
        "category": "Monitoring",
        "difficulty": "Medium",
        "question": "What are the Golden Signals of monitoring?",
        "answer": "Defined by Google SRE, the four golden signals are Latency (time to service a request), Traffic (demand on the system), Errors (rate of failing requests), and Saturation (how full a service is)."
    },
    {
        "company": "Microsoft",
        "category": "Cloud",
        "difficulty": "Hard",
        "question": "How do you handle secrets management in Terraform?",
        "answer": "Secrets should never be committed to source code or plain text state. Best practices include using external secret managers (like HashiCorp Vault, AWS Secrets Manager), passing them via environment variables `TF_VAR_xyz`, encrypting remote state files, and using the `sensitive` flag in Terraform outputs."
    },
    {
        "company": "Apple",
        "category": "Security",
        "difficulty": "Medium",
        "question": "What is cross-site scripting (XSS)?",
        "answer": "XSS is a type of security vulnerability where an attacker injects malicious client-side scripts into web pages viewed by other users, effectively bypassing access controls such as the same-origin policy."
    },
    {
        "company": "Meta",
        "category": "CI/CD",
        "difficulty": "Medium",
        "question": "Explain GitOps.",
        "answer": "GitOps is an operational framework that takes DevOps best practices used for application development (like version control, collaboration, compliance, and CI/CD) and applies them to infrastructure automation. The Git repository becomes the single source of truth for the system's infrastructure and applications."
    },
    {
        "company": "Google",
        "category": "Linux",
        "difficulty": "Hard",
        "question": "What is the difference between a soft link and a hard link in Linux?",
        "answer": "A hard link is a direct reference to a file's inode; it cannot span memory segments (partitions) or link directories. A soft (symbolic) link points to the file name, acting like a shortcut. It can link directories and span different partitions, but breaks if the target file is deleted."
    },
    {
        "company": "Amazon",
        "category": "Docker",
        "difficulty": "Hard",
        "question": "How do Docker namespaces and cgroups work?",
        "answer": "Namespaces provide isolation (PID, NET, IPC, MNT, UTS), making a container believe it has a dedicated OS instance. Control Groups (cgroups) manage and limit the resource usage (CPU, memory, Disk I/O, Network) of a collection of processes."
    },
    {
        "company": "Netflix",
        "category": "DevOps",
        "difficulty": "Medium",
        "question": "What is an Immutable Infrastructure?",
        "answer": "Immutable infrastructure implies that servers are never modified after they're deployed. If an update or fix is needed, new servers are built from a common image with the appropriate changes and deployed to replace the old ones."
    },
    {
        "company": "Microsoft",
        "category": "Kubernetes",
        "difficulty": "Medium",
        "question": "What is a Kubernetes Ingress?",
        "answer": "An Ingress is an API object that manages external access to the services in a cluster, typically HTTP/HTTPS. It can provide load balancing, SSL termination, and name-based virtual hosting."
    },
    {
        "company": "Apple",
        "category": "Networking",
        "difficulty": "Hard",
        "question": "What is the OSI model? Name the layers.",
        "answer": "The OSI (Open Systems Interconnection) model is a conceptual framework used to understand and describe how network protocols function. The 7 layers are: Physical, Data Link, Network, Transport, Session, Presentation, and Application."
    },
    {
        "company": "Meta",
        "category": "SRE",
        "difficulty": "Hard",
        "question": "Explain the concept of 'Toil' in SRE.",
        "answer": "Toil refers to operational work tied to running a production service that is manual, repetitive, automatable, tactical, devoid of enduring value, and scales linearly as a service grows. A primary goal of SRE is to reduce toil through automation."
    },
    {
        "company": "Google",
        "category": "Architecture",
        "difficulty": "Easy",
        "question": "What is Serverless computing?",
        "answer": "Serverless computing is a cloud execution model where the provider dynamically manages the allocation and provisioning of servers. Developers only focus on writing code, and are charged based only on resources consumed during execution, not idle time."
    },
    {
        "company": "Amazon",
        "category": "Security",
        "difficulty": "Hard",
        "question": "What is the role of a WAF?",
        "answer": "A Web Application Firewall (WAF) helps protect web applications by filtering and monitoring HTTP traffic between a web application and the Internet. It protects against attacks like cross-site forgery, cross-site-scripting (XSS), file inclusion, and SQL injection."
    },
    {
        "company": "Netflix",
        "category": "Cloud",
        "difficulty": "Hard",
        "question": "What is the difference between an Application Load Balancer (ALB) and a Network Load Balancer (NLB) in AWS?",
        "answer": "ALB operates at Layer 7 (Application layer), routing traffic based on HTTP headers and paths, ideal for modern arch architectures like microservices. NLB operates at Layer 4 (Transport layer), routing traffic based on IP protocol data, capable of handling millions of requests per second at ultra-low latencies."
    },
    {
        "company": "Microsoft",
        "category": "Git",
        "difficulty": "Medium",
        "question": "What does git rebase do?",
        "answer": "Git rebase integrates changes from one branch into another by moving or combining a sequence of commits to a new base commit. It creates a cleaner, linear history compared to git merge, but rewrites commit history."
    },
    {
        "company": "Apple",
        "category": "Linux",
        "difficulty": "Medium",
        "question": "What does the `top` command do in Linux?",
        "answer": "The `top` command provides a dynamic, real-time view of a running system. It displays system summary information as well as a list of processes currently being managed by the Linux kernel, sorted by CPU or memory usage."
    },
    {
        "company": "Meta",
        "category": "Monitoring",
        "difficulty": "Easy",
        "question": "What is Prometheus?",
        "answer": "Prometheus is an open-source systems monitoring and alerting toolkit. It collects metrics from configured targets at given intervals, evaluates rule expressions, displays the results, and can trigger alerts if some condition is observed to be true."
    }
];

const categoriesData = [
    { name: 'Docker', slug: 'docker', description: 'Containerization and image management' },
    { name: 'Kubernetes', slug: 'kubernetes', description: 'Orchestration and cluster management' },
    { name: 'CI/CD', slug: 'ci-cd', description: 'Continuous Integration and Deployment pipelines' },
    { name: 'DevOps', slug: 'devops', description: 'Culture, practices, and general concepts' },
    { name: 'Cloud', slug: 'cloud', description: 'AWS, Azure, and cloud infrastructure' },
    { name: 'Security', slug: 'security', description: 'Container security, network security, and best practices' },
    { name: 'Networking', slug: 'networking', description: 'Load balancing, DNS, and protocols' },
    { name: 'Linux', slug: 'linux', description: 'Kernel, shell, and system administration' },
    { name: 'Monitoring', slug: 'monitoring', description: 'Observability, logging, and alerting' },
    { name: 'Microservices', slug: 'microservices', description: 'Service architecture and patterns' },
    { name: 'Git', slug: 'git', description: 'Version control and collaboration' },
    { name: 'Architecture', slug: 'architecture', description: 'System design and resiliency' },
    { name: 'SRE', slug: 'sre', description: 'Site Reliability Engineering principles' }
];

const seedDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/devops-prep';
        await mongoose.connect(uri);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await Question.deleteMany({});
        const Category = require('./models/Category');
        await Category.deleteMany({});

        // Insert new data
        await Question.insertMany(questions);
        await Category.insertMany(categoriesData);

        console.log(`Database Seeded successfully!`);
        console.log(`- Questions: ${questions.length}`);
        console.log(`- Categories: ${categoriesData.length}`);
        
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
