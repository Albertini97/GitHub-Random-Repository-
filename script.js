document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language-select');
    const fetchRepoButton = document.getElementById('fetch-repo');
    const repoInfo = document.getElementById('repo-info');
    const repoName = document.getElementById('repo-name');
    const repoDescription = document.getElementById('repo-description');
    const repoStars = document.getElementById('repo-stars');
    const repoForks = document.getElementById('repo-forks');
    const repoIssues = document.getElementById('repo-issues');
    const refreshRepoButton = document.getElementById('refresh-repo');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');

    fetchRepoButton.addEventListener('click', fetchRandomRepo);
    refreshRepoButton.addEventListener('click', fetchRandomRepo);

    async function fetchRandomRepo() {
        const language = languageSelect.value;
        const apiUrl = `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`;

        loading.classList.remove('hidden');
        repoInfo.classList.add('hidden');
        error.classList.add('hidden');

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Error al cargar los datos');
            }
            const data = await response.json();
            const repos = data.items;
            if (repos.length === 0) {
                throw new Error('No se encontraron repositorios');
            }
            const randomRepo = repos[Math.floor(Math.random() * repos.length)];

            repoName.textContent = randomRepo.name;
            repoDescription.textContent = randomRepo.description || 'No hay descripción disponible';
            repoStars.textContent = randomRepo.stargazers_count;
            repoForks.textContent = randomRepo.forks_count;
            repoIssues.textContent = randomRepo.open_issues_count;

            repoInfo.classList.remove('hidden');
        } catch (err) {
            error.classList.remove('hidden');
            console.error(err);
        } finally {
            loading.classList.add('hidden');
        }
    }
});