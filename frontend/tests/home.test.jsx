import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Home from '../src/pages/Home';

// Mock PostList pour éviter l'appel API
vi.mock('../src/components/PostList', () => ({
    default: () => <div data-testid="postlist" />,
}));

test('renders a H1 element', async () => {
    render(<Home />);

    // Vérifie le H1
    const heading = await screen.findByRole('heading', {level: 1});
    expect(heading).toBeInTheDocument();

    // Vérifie que PostList est rendu
    expect(screen.getByTestId('postlist')).toBeInTheDocument();
});
