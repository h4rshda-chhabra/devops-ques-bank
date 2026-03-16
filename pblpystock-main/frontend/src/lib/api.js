const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// --- Questions ---

export async function getQuestions(params) {
    const url = new URL(`${API_URL}/questions`);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value) url.searchParams.append(key, value);
        });
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch questions');
    return response.json();
}

export async function getQuestion(id) {
    const response = await fetch(`${API_URL}/questions/${id}`);
    if (!response.ok) throw new Error('Failed to fetch question');
    return response.json();
}

export async function createQuestion(data) {
    const response = await fetch(`${API_URL}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create question');
    return response.json();
}

export async function updateQuestion(id, data) {
    const response = await fetch(`${API_URL}/questions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update question');
    return response.json();
}

export async function deleteQuestion(id) {
    const response = await fetch(`${API_URL}/questions/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete question');
    return response.json();
}

// --- Categories ---

export async function getCategories() {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
}

export async function getCategoryQuestions(category) {
    const response = await fetch(`${API_URL}/questions/category/${encodeURIComponent(category)}`);
    if (!response.ok) throw new Error('Failed to fetch category questions');
    return response.json();
}
