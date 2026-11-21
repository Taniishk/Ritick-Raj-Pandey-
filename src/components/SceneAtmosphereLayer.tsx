import { useMemo } from 'react';
import { SceneMeta } from '../data/scenesMeta';

interface SceneAtmosphereLayerProps {
  meta: SceneMeta;
  lanternCount?: number;
}

export function SceneAtmosphereLayer({ meta, lanternCount = 0 }: SceneAtmosphereLayerProps) {
  const petals = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        left: `${(i * 17 + 5) % 96}%`,
        delay: `${(i * 0.55) % 6}s`,
        duration: `${6 + (i % 4) * 1.4}s`,
        size: 14 + (i % 4) * 5,
      })),
    [],
  );

  const raindrops = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        left: `${(i * 11 + 3) % 98}%`,
        delay: `${(i * 0.23) % 2}s`,
        duration: `${0.9 + (i % 3) * 0.25}s`,
      })),
    [],
  );

  const mode = meta.dioramaMode;

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* Subtle Fairy Lights String across top on cozy indoor/garden scenes */}
      {(mode === 'apology' ||
        mode === 'love_cafe' ||
        mode === 'letter_room' ||
        mode === 'safe_place' ||
        mode === 'moonlight_balcony') && (
        <div className="absolute top-12 left-0 right-0 flex justify-around px-4 opacity-80">
          {Array.from({ length: 12 }, (_, idx) => (
            <span
              key={idx}
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: idx % 2 === 0 ? '#fde68a' : '#fbcfe8',
                boxShadow: '0 0 12px 3px rgba(253, 230, 138, 0.75)',
                transform: `translateY(${Math.sin(idx * 0.9) * 8}px)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Falling Rose Petals on Rose Sky & Deep Letter & Entrance */}
      {(mode === 'rose_sky' || mode === 'deep_letter' || mode === 'flower_shop') &&
        petals.map((p, idx) => (
          <span
            key={idx}
            className="absolute top-0 select-none"
            style={{
              left: p.left,
              fontSize: `${p.size}px`,
              animation: `petalFall ${p.duration} linear ${p.delay} infinite`,
            }}
          >
            {idx % 3 === 0 ? '🌹' : '🌸'}
          </span>
        ))}

      {/* Cozy Rain Outside Window on Love Cafe & Safe Place */}
      {(mode === 'love_cafe' || mode === 'safe_place') &&
        raindrops.map((r, idx) => (
          <span
            key={idx}
            className="absolute top-0 w-[1.5px] h-10 rounded-full opacity-35"
            style={{
              left: r.left,
              background:
                mode === 'safe_place'
                  ? 'linear-gradient(to bottom, transparent, #a5b4fc)'
                  : 'linear-gradient(to bottom, transparent, #f472b6)',
              animation: `petalFall ${r.duration} linear ${r.delay} infinite`,
            }}
          />
        ))}

      {/* Pastel Rainbow Arc on Cloud Nine */}
      {mode === 'cloud_nine' && (
        <div
          className="absolute left-1/2 top-16 -translate-x-1/2 h-[340px] w-[680px] rounded-t-full opacity-45"
          style={{
            border: '26px solid transparent',
            borderTopColor: 'rgba(244, 114, 182, 0.45)',
            boxShadow:
              'inset 0 18px 0 rgba(251, 191, 36, 0.35), inset 0 36px 0 rgba(125, 211, 252, 0.35)',
          }}
        />
      )}

      {/* Disco Spotlight Cones on Teddy Dance Party */}
      {mode === 'dance_party' && (
        <>
          <div
            className="absolute -top-10 left-1/4 h-[80vh] w-56 -rotate-12 opacity-25"
            style={{
              background: 'linear-gradient(to bottom, rgba(244,114,182,0.8), transparent)',
            }}
          />
          <div
            className="absolute -top-10 right-1/4 h-[80vh] w-56 rotate-12 opacity-25"
            style={{
              background: 'linear-gradient(to bottom, rgba(168,85,247,0.8), transparent)',
            }}
          />
        </>
      )}

      {/* Waterfall Shimmer on Butterfly Paradise */}
      {mode === 'butterfly_garden' && (
        <div
          className="absolute right-6 top-16 bottom-20 w-24 rounded-full opacity-30"
          style={{
            background:
              'linear-gradient(to bottom, rgba(186,230,253,0.9), rgba(232,121,249,0.5), transparent)',
          }}
        />
      )}

      {/* Floating Sky Lanterns on Moonlight Balcony */}
      {mode === 'moonlight_balcony' &&
        Array.from({ length: 4 + Math.min(8, lanternCount) }, (_, idx) => (
          <div
            key={idx}
            className="absolute bottom-24 flex flex-col items-center animate-float-slow"
            style={{
              left: `${10 + ((idx * 17) % 80)}%`,
              bottom: `${18 + ((idx * 13) % 58)}%`,
              animationDelay: `${idx * 0.4}s`,
            }}
          >
            <div
              className="h-9 w-7 rounded-t-xl rounded-b-md border border-amber-200/60"
              style={{
                background: 'linear-gradient(to top, #f59e0b, #fef3c7)',
                boxShadow: '0 0 22px rgba(251, 191, 36, 0.65)',
              }}
            />
          </div>
        ))}
    </div>
  );
}
