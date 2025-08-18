export default function SpriteIcon({ position, size
}) {
  return (
    <div
      className="bg-no-repeat bg-contain"
      style={{
        backgroundImage: `url('/sprites/facebook-sprite.png')`,
        backgroundPosition: position,
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-block',
      }}
    />
  );
}
