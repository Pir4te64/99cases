// src/components/SvgColorEditor.tsx
import React, { useEffect, useRef, useState } from 'react';

interface SvgColorEditorProps {
    /** URL donde está tu SVG (base64 o ruta pública) */
    svgUrl: string;
}

const SvgColorEditor: React.FC<SvgColorEditorProps> = ({ svgUrl }) => {
    const [rawSvg, setRawSvg] = useState<string>('');
    const [colorGrupo, setColorGrupo] = useState<string>('#ff0000');
    const [colorRemera, setColorRemera] = useState<string>('#00ff00');
    const containerRef = useRef<HTMLDivElement>(null);

    // 1. Fetch del SVG como texto
    useEffect(() => {
        fetch(svgUrl)
            .then(res => res.text())
            .then(svgText => setRawSvg(svgText))
            .catch(console.error);
    }, [svgUrl]);

    // 2. Cada vez que cambie el SVG o los colores, repinta los path dentro de los <g> con esos ids
    useEffect(() => {
        const svgEl = containerRef.current?.querySelector('svg');
        if (!svgEl) return;

        // Todos los <path> dentro de <g id="_Grupo_">
        svgEl
            .querySelectorAll('#_Grupo_ path')
            .forEach((p) => p.setAttribute('fill', colorGrupo));

        // Todos los <path> dentro de <g id="Remera">
        svgEl
            .querySelectorAll('#Remera path')
            .forEach((p) => p.setAttribute('fill', colorRemera));
    }, [rawSvg, colorGrupo, colorRemera]);

    return (
        <div className="p-4">
            {/* Controles responsive */}
            <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                    <label className="whitespace-nowrap">Color Grupo:</label>
                    <input
                        type="color"
                        value={colorGrupo}
                        onChange={e => setColorGrupo(e.target.value)}
                        className="h-8 w-12 border-0 p-0"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label className="whitespace-nowrap">Color Remera:</label>
                    <input
                        type="color"
                        value={colorRemera}
                        onChange={e => setColorRemera(e.target.value)}
                        className="h-8 w-12 border-0 p-0"
                    />
                </div>
            </div>

            {/* Aquí se inyecta el SVG crudo */}
            <div
                ref={containerRef}
                className="overflow-auto"
                dangerouslySetInnerHTML={{ __html: rawSvg }}
            />
        </div>
    );
};

export default SvgColorEditor;
