import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Filters from '@/components/HomeScreen/Filters';
import { useRouter } from 'next/navigation';

// Mock para useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Filters component', () => {
  beforeEach(() => {
    // Resetea el mock de useRouter antes de cada prueba
    useRouter.mockReset();
  });

  it('renders the component correctly', async () => {
    // Configura el mock de useRouter para devolver una ubicación de prueba
    useRouter.mockReturnValueOnce({
      pathname: '/test-path',
    });

    // Renderiza el componente
    render(<Filters query={{}} />);

    // Verifica que se renderice el título
    expect(screen.getByText('Filtros de busqueda')).toBeInTheDocument();

    // Verifica que se renderice el botón de aplicar
    expect(screen.getByRole('button', { name: 'Aplicar' })).toBeInTheDocument();
  });

  it('applies filters when the form is submitted', async () => {
    // Configura una función mock para el router.push
    const mockRouterPush = jest.fn();
    useRouter.mockReturnValueOnce({
      pathname: '/test-path',
      push: mockRouterPush,
    });

    // Renderiza el componente
    render(<Filters query={{}} />);

    // Simula seleccionar una unidad
    fireEvent.change(screen.getByLabelText('Unidades'), {
      target: { value: 'metric' },
    });

    // Simula enviar el formulario
    fireEvent.click(screen.getByRole('button', { name: 'Aplicar' }));

    // Verifica que el router.push haya sido llamado con los parámetros correctos
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith(
        '/test-path?unit=metric',
        expect.anything(),
      );
    });
  });

  // Otros casos de prueba pueden incluir pruebas para la selección de país, estado, ciudad, etc.
});
