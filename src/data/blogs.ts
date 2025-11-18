import { BlogPost } from '@/types/blog'

export const blogs: BlogPost[] = [
  {
    id: 'ssh-server-guide',
    title: 'How to SSH Into Your Server (The Right Way) A Beginner-Friendly Guide with Pro Tips',
    description: 'A comprehensive guide on securely connecting to remote servers using SSH, tailored for beginners with professional tips and best practices.',
    content: `# How to SSH Into Your Server (The Right Way) A Beginner-Friendly Guide with Pro Tips

SSH (Secure Shell) is an essential tool for developers and system administrators. This guide will walk you through the proper way to connect to your server securely.

## What is SSH?

SSH is a cryptographic network protocol that allows secure communication between two computers over an unsecured network. It's commonly used for:

- Remote server access
- Secure file transfers
- Command execution on remote machines

## Basic SSH Connection

The most basic SSH connection command is:

\`\`\`bash
ssh username@server-ip-address
\`\`\`

## Key-Based Authentication

For enhanced security, use SSH keys instead of passwords:

1. Generate an SSH key pair:
\`\`\`bash
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
\`\`\`

2. Copy your public key to the server:
\`\`\`bash
ssh-copy-id username@server-ip-address
\`\`\`

## Pro Tips

- Always use key-based authentication
- Disable password authentication on production servers
- Use non-standard SSH ports
- Implement fail2ban for additional security
- Regularly update your SSH client and server

## Conclusion

SSH is a powerful tool that, when used correctly, provides secure and efficient remote access to your servers. Following these best practices will help keep your connections secure and your servers protected.

Read the full article on Medium for detailed examples and advanced configurations.`,
    date: '2025-10-19',
    author: 'Pulkit Saraf',
    tags: ['SSH', 'DevOps', 'Security', 'Server Management', 'Linux'],
    readTime: '3 min read',
    externalUrl: 'https://medium.com/@code_kartik/how-to-ssh-into-your-server-the-right-way-a-beginner-friendly-guide-with-pro-tips-cbd0e8855c9a'
  }
]

export const getBlogById = (id: string): BlogPost | undefined => {
  return blogs.find(blog => blog.id === id)
}
